from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, List
from datetime import datetime
import json
import os
from dotenv import load_dotenv
import google.generativeai as genai

# 환경 변수 로드
load_dotenv()

app = FastAPI()

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 출처 허용 (프로덕션에서는 특정 도메인으로 제한)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 정적 파일 제공
app.mount("/static", StaticFiles(directory="static"), name="static")

# Gemini API 설정
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY and GEMINI_API_KEY != "your_gemini_api_key_here":
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel('gemini-1.5-flash')
else:
    model = None
    print("⚠️ Gemini API 키가 설정되지 않았습니다. .env 파일을 확인해주세요.")

# 연결된 클라이언트 관리
class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}
        self.user_locations: Dict[str, dict] = {}  # 사용자 위치 정보 저장

    async def connect(self, username: str, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[username] = websocket

    def disconnect(self, username: str):
        if username in self.active_connections:
            del self.active_connections[username]
        if username in self.user_locations:
            del self.user_locations[username]

    async def broadcast(self, message: dict):
        """모든 연결된 클라이언트에게 메시지 전송"""
        disconnected = []
        for username, connection in self.active_connections.items():
            try:
                await connection.send_json(message)
            except Exception:
                disconnected.append(username)

        # 연결이 끊긴 클라이언트 제거
        for username in disconnected:
            self.disconnect(username)

    def get_user_count(self) -> int:
        return len(self.active_connections)

    def get_usernames(self) -> List[str]:
        return list(self.active_connections.keys())

manager = ConnectionManager()

@app.get("/")
async def get():
    """메인 페이지 (채팅 클라이언트)"""
    try:
        with open("static/index.html", "r", encoding="utf-8") as f:
            html_content = f.read()
        return HTMLResponse(content=html_content)
    except FileNotFoundError:
        return HTMLResponse(
            content="<h1>채팅 클라이언트를 찾을 수 없습니다. static/index.html 파일을 확인해주세요.</h1>",
            status_code=404
        )

def detect_meeting_keywords(message: str) -> bool:
    """약속 관련 키워드 감지"""
    keywords = [
        "만나", "만날", "만남", "약속", "모임", "모이", "볼까", "볼래",
        "어디서", "어디", "장소", "언제", "시간", "몇시",
        "저녁", "점심", "밥", "식사", "커피", "술", "회식"
    ]
    return any(keyword in message for keyword in keywords)

async def get_place_recommendation(chat_history: List[dict], usernames: List[str]) -> str:
    """Gemini API를 사용하여 장소 추천"""
    if not model:
        return "Gemini API가 설정되지 않아 추천을 제공할 수 없습니다. .env 파일에 GEMINI_API_KEY를 설정해주세요."

    try:
        # 대화 맥락 구성
        chat_context = "\n".join([
            f"{msg['username']}: {msg['content']}"
            for msg in chat_history[-10:]  # 최근 10개 메시지
            if msg.get('type') == 'message'
        ])

        participants = ", ".join(usernames)

        prompt = f"""
당신은 '모여톡' AI 약속 어시스턴트입니다. 카카오톡 채팅방에서 친구들의 대화를 분석하여 최적의 만남 장소를 추천합니다.

[참여자]
{participants}

[대화 내용]
{chat_context}

위 대화를 분석하여 다음을 추천해주세요:
1. 만남 목적 (식사, 커피, 술 등)
2. 추천 장소 3곳 (구체적인 가게명과 위치)
3. 각 장소의 추천 이유 (간단하게)

답변은 친근하고 캐주얼한 카카오톡 말투로 작성해주세요.
"""

        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Gemini API Error: {e}")
        return f"추천을 생성하는 중 오류가 발생했습니다: {str(e)}"

@app.websocket("/ws/{username}")
async def websocket_endpoint(websocket: WebSocket, username: str):
    """WebSocket 연결 엔드포인트"""

    # 연결 수락
    await manager.connect(username, websocket)

    # 입장 알림 메시지
    join_message = {
        "type": "system",
        "username": "시스템",
        "content": f"{username}님이 입장하셨습니다.",
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "user_count": manager.get_user_count()
    }
    await manager.broadcast(join_message)

    # 대화 히스토리 (약속 추천을 위해)
    chat_history = []

    try:
        while True:
            # 클라이언트로부터 메시지 수신
            data = await websocket.receive_text()
            message_data = json.loads(data)

            # 메시지에 타임스탬프 추가
            message_data["timestamp"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            message_data["user_count"] = manager.get_user_count()

            # 대화 히스토리에 추가
            chat_history.append(message_data)

            # 모든 클라이언트에게 메시지 브로드캐스팅
            await manager.broadcast(message_data)

            # 약속 키워드 감지
            if message_data.get("type") == "message":
                content = message_data.get("content", "")
                if detect_meeting_keywords(content):
                    # AI 추천 트리거 메시지
                    bot_trigger = {
                        "type": "bot_trigger",
                        "username": "모여톡 AI",
                        "content": "약속 잡으시는 거 같은데, 제가 장소 추천해드릴까요? 👋",
                        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                        "user_count": manager.get_user_count()
                    }
                    await manager.broadcast(bot_trigger)

            # 장소 추천 요청 처리
            if message_data.get("type") == "request_recommendation":
                # 추천 생성 중 메시지
                loading_message = {
                    "type": "bot_loading",
                    "username": "모여톡 AI",
                    "content": "장소를 추천하고 있어요... 🤔",
                    "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                    "user_count": manager.get_user_count()
                }
                await manager.broadcast(loading_message)

                # Gemini API로 장소 추천
                usernames = manager.get_usernames()
                recommendation = await get_place_recommendation(chat_history, usernames)

                # 추천 결과 전송
                recommendation_message = {
                    "type": "bot_recommendation",
                    "username": "모여톡 AI",
                    "content": recommendation,
                    "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                    "user_count": manager.get_user_count()
                }
                await manager.broadcast(recommendation_message)

    except WebSocketDisconnect:
        # 연결 해제
        manager.disconnect(username)

        # 퇴장 알림 메시지
        leave_message = {
            "type": "system",
            "username": "시스템",
            "content": f"{username}님이 퇴장하셨습니다.",
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "user_count": manager.get_user_count()
        }
        await manager.broadcast(leave_message)
    except Exception as e:
        print(f"Error: {e}")
        manager.disconnect(username)

@app.get("/health")
async def health_check():
    """서버 상태 확인"""
    return {
        "status": "healthy",
        "active_connections": manager.get_user_count(),
        "gemini_api_configured": model is not None
    }

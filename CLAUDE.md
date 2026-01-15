# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Kanana (모여톡)** is an AI-powered KakaoTalk meeting assistant that helps friends plan gatherings by automatically detecting meeting-related conversations and recommending optimal meeting locations using Google's Gemini AI.

The application is a real-time chat interface that mimics KakaoTalk's UI, with an embedded AI assistant that:
1. Detects meeting-related keywords in conversations
2. Collects participant preferences (departure location, mood, activity, etc.)
3. Uses Gemini AI to recommend suitable meeting places based on context
4. Provides recommendations in a friendly, KakaoTalk-style format

## Architecture

### Backend (FastAPI + WebSockets)
- **server.py**: Single-file FastAPI application handling all backend logic
  - WebSocket server for real-time bidirectional communication (endpoint: `/ws/{username}`)
  - ConnectionManager class manages active WebSocket connections and user state
  - Gemini AI integration for intelligent place recommendations
  - Keyword-based meeting detection using simple string matching
  - Chat history tracking for context-aware AI recommendations

### Frontend (React + TypeScript + Vite + Tailwind CSS)
- **Modern React SPA** built with TypeScript and Vite
- **Component Architecture** (Clean Code principles):
  - **Layout**: Container, Header
  - **Auth**: LoginScreen
  - **Chat**: ChatScreen, MessageList, InputArea, Message components (6 types)
  - **BottomSheet**: Two-step meeting preference form
  - **UI**: Reusable components (Button, Input, Chip, ProfileAvatar, RecommendationCard)
- **State Management**:
  - React Context API for global state (ChatContext)
  - Custom hooks (useWebSocket, useChat, useMeetingForm, useBottomSheet)
- **Styling**: Tailwind CSS v3 with custom KakaoTalk theme colors
- **Build**: Vite outputs to `static/` directory for FastAPI integration

### AI Integration
- Uses Google Gemini 2.0 Flash model (`gemini-2.0-flash-exp`)
- Context-aware recommendations based on:
  - Recent chat history (last 10 messages)
  - User-provided meeting preferences (departure, destination, time, mood, activity)
  - All active participants in the chat room
- Generates recommendations in casual Korean with emojis

### Message Flow
1. User sends message via WebSocket
2. Server broadcasts to all connected clients
3. If meeting keywords detected → Bot sends trigger message
4. User clicks "네, 추천해주세요!" → Opens bottom sheet modal
5. User completes two-step form → Sends request_recommendation message
6. Server generates AI recommendation using Gemini
7. Recommendation broadcast to all participants as cards

## Development Commands

### Backend Setup
```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
# Create .env file with:
# GEMINI_API_KEY=your_api_key_here

# Run FastAPI server
uvicorn server:app --reload --port 8000
```

### Frontend Setup
```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Run development server (with hot reload)
npm run dev

# Build for production
npm run build

# Type check
npm run type-check

# Lint code
npm run lint
```

### Development Workflow
1. **Start FastAPI backend**: `uvicorn server:app --reload --port 8000`
2. **Start Vite dev server**: `cd client && npm run dev` (runs on port 5173)
3. **Access app**: http://localhost:5173 (Vite proxies WebSocket to port 8000)

### Production Build
```bash
cd client
npm run build
# Built files are output to ../static/
# FastAPI serves these files at http://localhost:8000
```

## Project Structure

```
/Users/ian.lee2/Documents/onboarding/hackathon/
├── server.py                   # FastAPI backend
├── requirements.txt            # Python dependencies
├── .env                        # Environment variables (GEMINI_API_KEY)
├── static/                     # Production build output (from client/dist)
│   ├── index.html
│   ├── assets/
│   │   ├── index-*.js
│   │   └── index-*.css
│   └── vite.svg
├── venv/                       # Python virtual environment
└── client/                     # React frontend
    ├── package.json
    ├── vite.config.ts          # Vite configuration (proxy, build output)
    ├── tailwind.config.js      # Tailwind theme with KakaoTalk colors
    ├── tsconfig.app.json       # TypeScript configuration
    ├── src/
    │   ├── main.tsx            # React entry point
    │   ├── App.tsx             # Root component
    │   ├── index.css           # Tailwind directives + custom utilities
    │   ├── types/              # TypeScript type definitions
    │   │   ├── message.types.ts
    │   │   ├── meeting.types.ts
    │   │   └── index.ts
    │   ├── constants/          # Application constants
    │   │   ├── websocket.ts
    │   │   ├── meeting.ts
    │   │   └── colors.ts
    │   ├── utils/              # Utility functions
    │   │   ├── time.utils.ts
    │   │   ├── message.utils.ts
    │   │   └── recommendation.utils.ts
    │   ├── hooks/              # Custom React hooks
    │   │   ├── useWebSocket.ts
    │   │   ├── useChat.ts
    │   │   ├── useMeetingForm.ts
    │   │   └── useBottomSheet.ts
    │   ├── contexts/           # React Context providers
    │   │   └── ChatContext.tsx
    │   └── components/
    │       ├── Layout/         # Layout components
    │       ├── Auth/           # Authentication
    │       ├── Chat/           # Chat components
    │       │   └── Message/    # Message type components
    │       ├── BottomSheet/    # Modal form
    │       └── UI/             # Reusable UI components
    └── dist/                   # Build output (copied to ../static)
```

## Key Technical Details

### WebSocket Protocol
- **Endpoint**: `/ws/{username}`
- **Message Types**:
  - `message`: Regular chat messages
  - `system`: Join/leave notifications
  - `bot_trigger`: AI recommendation prompt
  - `bot_loading`: AI processing indicator
  - `bot_recommendation`: AI-generated recommendations
  - `request_recommendation`: Client request with meeting preferences

### Meeting Keywords (Korean)
Detected in `server.py`: 만나, 만날, 만남, 약속, 모임, 모이, 볼까, 볼래, 어디서, 어디, 장소, 언제, 시간, 몇시, 저녁, 점심, 밥, 식사, 커피, 술, 회식

### Meeting Data Structure
```typescript
interface MeetingData {
  departure: string;      // 출발 지점
  destination: string;    // 만나고 싶은 곳
  when: string;           // 만나는 시간 (오늘, 내일, etc.)
  mood: string;           // 원하는 분위기 (조용한, 활기찬, etc.)
  activity: string;       // 하고 싶은 활동 (식사, 커피, etc.)
  additional: string;     // 추가 고려사항
}
```

### Path Aliases (TypeScript)
```
@components/* → src/components/*
@hooks/*      → src/hooks/*
@contexts     → src/contexts
@app-types    → src/types
@utils        → src/utils
@constants/*  → src/constants/*
```

### Vite Configuration
- **Dev Server**: Port 5173 with WebSocket proxy to FastAPI (port 8000)
- **Build Output**: `../static/` (replaces old HTML file)
- **Vendor Chunking**: React and ReactDOM separated for caching

### Tailwind Theme Colors
```javascript
'kakao-yellow': '#FEE500',
'kakao-blue': '#B2C7D9',
'kakao-text': '#3C1E1E',
'kanana-pink': '#FF6B9D',
'kanana-purple': '#C239B3'
```

## Clean Code Principles Applied

1. **Single Responsibility**: Each component has one clear purpose
2. **DRY**: Reusable UI components (Button, Chip) used throughout
3. **Separation of Concerns**: Logic in hooks, presentation in components
4. **Type Safety**: TypeScript with strict mode, discriminated unions for message types
5. **Composition**: Components composed from smaller components

## Common Development Tasks

### Adding a New Message Type
1. Add type to `client/src/types/message.types.ts`
2. Create component in `client/src/components/Chat/Message/`
3. Update `MessageList.tsx` to render new type
4. Handle in backend `server.py` if needed

### Modifying Meeting Form
1. Update types in `client/src/types/meeting.types.ts`
2. Add options to `client/src/constants/meeting.ts`
3. Update `MeetingFormStep1/2.tsx` components

### Changing Styles
- **Global styles**: `client/src/index.css`
- **Theme colors**: `client/tailwind.config.js`
- **Component styles**: Tailwind classes in TSX files

## Important Notes

- **No authentication**: Usernames are self-declared (prototype)
- **CORS**: Wide open (`allow_origins=["*"]`) - restrict in production
- **Chat history**: In-memory only, cleared on server restart
- **API key**: Stored in `.env` - ensure `.gitignore` includes `.env`
- **WebSocket proxy**: Vite dev server proxies `/ws` to FastAPI
- **Build output**: `npm run build` outputs to `../static/`, overwriting old files

## Troubleshooting

**Build fails with TypeScript errors**:
- Check path aliases in `tsconfig.app.json`
- Ensure `verbatimModuleSyntax: false`
- Don't use `@types` as path alias (reserved by TypeScript)

**WebSocket connection fails**:
- Ensure FastAPI backend is running on port 8000
- Check Vite proxy configuration in `vite.config.ts`
- Verify WebSocket URL construction in `constants/websocket.ts`

**Tailwind classes not applying**:
- Ensure `tailwind.config.js` content paths include all `.tsx` files
- Verify PostCSS configuration in `postcss.config.js`
- Check if Tailwind v3 is installed (not v4)

**Hot reload not working**:
- Restart Vite dev server
- Check for TypeScript errors in console
- Verify all imports use correct path aliases

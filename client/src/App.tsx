import React, { useState, useEffect } from 'react';
import { Container } from '@components/Layout/Container';
import { Header } from '@components/Layout/Header';
import { LoginScreen } from '@components/Auth/LoginScreen';
import { ChatScreen } from '@components/Chat/ChatScreen';
import { BottomSheet } from '@components/BottomSheet/BottomSheet';
import { ChatProvider, useChatContext } from '@contexts/ChatContext';
import { useBottomSheet } from '@hooks/useBottomSheet';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const { isOpen, open, close } = useBottomSheet();

  const handleLogin = (username: string) => {
    setUsername(username);
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center h-screen bg-kakao-blue">
        <Container>
          <LoginScreen onLogin={handleLogin} />
        </Container>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-kakao-blue">
      <ChatProvider username={username}>
        <ChatProviderContent
          username={username}
          onOpenBottomSheet={open}
          bottomSheetOpen={isOpen}
          onCloseBottomSheet={close}
        />
      </ChatProvider>
    </div>
  );
}

interface ChatProviderContentProps {
  username: string;
  onOpenBottomSheet: () => void;
  bottomSheetOpen: boolean;
  onCloseBottomSheet: () => void;
}

const ChatProviderContent: React.FC<ChatProviderContentProps> = ({
  username,
  onOpenBottomSheet,
  bottomSheetOpen,
  onCloseBottomSheet,
}) => {
  const { userCount, connect } = useChatContext();

  // Connect to WebSocket on mount
  useEffect(() => {
    connect(username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return (
    <Container>
      <Header userCount={userCount} />
      <ChatScreen onRequestRecommendation={onOpenBottomSheet} />
      <BottomSheet isOpen={bottomSheetOpen} onClose={onCloseBottomSheet} />
    </Container>
  );
};

export default App;

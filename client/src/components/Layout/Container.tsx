import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="w-full max-w-[480px] h-screen bg-kakao-blue flex flex-col overflow-hidden">
      {children}
    </div>
  );
};

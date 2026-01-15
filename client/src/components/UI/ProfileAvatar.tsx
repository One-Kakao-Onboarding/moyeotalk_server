import React from 'react';

interface ProfileAvatarProps {
  username: string;
  variant?: 'user' | 'kanana';
  className?: string;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  username,
  variant = 'user',
  className = '',
}) => {
  if (variant === 'kanana') {
    return (
      <div
        className={`w-[42px] h-[42px] rounded-full bg-gradient-to-br from-kanana-pink to-kanana-purple flex items-center justify-center text-white text-xl font-semibold mr-2 shrink-0 ${className}`}
      >
        K
      </div>
    );
  }

  const initial = username.charAt(0).toUpperCase();

  return (
    <div
      className={`w-[42px] h-[42px] rounded-full bg-gradient-to-br from-profile-blue to-profile-purple flex items-center justify-center text-white text-base font-semibold mr-2 shrink-0 ${className}`}
    >
      {initial}
    </div>
  );
};

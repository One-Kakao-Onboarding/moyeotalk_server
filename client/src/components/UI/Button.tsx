import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  disabled = false,
  onClick,
  children,
  className = '',
  type = 'button',
}) => {
  const baseStyles = 'px-4 py-2.5 rounded-lg text-[15px] font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-kakao-yellow text-kakao-text hover:bg-kakao-yellow-dark',
    secondary: 'bg-white text-gray-800 border border-gray-200 hover:bg-gray-50',
    outline: 'bg-transparent text-gray-800 border border-gray-200 hover:bg-gray-50',
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

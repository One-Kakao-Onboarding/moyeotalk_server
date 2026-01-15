import React from 'react';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  className?: string;
  autoComplete?: string;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = '',
  maxLength,
  className = '',
  autoComplete = 'off',
  onKeyPress,
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      autoComplete={autoComplete}
      onKeyPress={onKeyPress}
      className={`w-full px-3.5 py-3.5 text-[15px] border border-gray-200 rounded-lg bg-gray-100 focus:outline-none focus:border-kakao-yellow focus:bg-white transition-colors ${className}`}
    />
  );
};

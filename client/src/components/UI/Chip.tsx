import React from 'react';

interface ChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({ label, selected, onClick, className = '' }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`py-2.5 px-5 rounded-3xl text-[15px] cursor-pointer transition-all ${
        selected
          ? 'bg-kakao-text text-white border-kakao-text'
          : 'bg-gray-100 border border-gray-200 hover:bg-gray-200'
      } ${className}`}
    >
      {label}
    </button>
  );
};

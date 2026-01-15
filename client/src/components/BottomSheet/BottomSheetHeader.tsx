import React from 'react';

interface BottomSheetHeaderProps {
  title: string;
  onClose: () => void;
}

export const BottomSheetHeader: React.FC<BottomSheetHeaderProps> = ({ title, onClose }) => {
  return (
    <div className="p-5 border-b border-gray-200 text-center relative">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <span
        onClick={onClose}
        className="absolute right-5 top-5 text-2xl cursor-pointer text-gray-400 hover:text-gray-600"
      >
        ×
      </span>
    </div>
  );
};

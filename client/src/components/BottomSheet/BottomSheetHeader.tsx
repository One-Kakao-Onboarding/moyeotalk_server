import React from 'react';

interface BottomSheetHeaderProps {
  title: string;
  onClose: () => void;
}

export const BottomSheetHeader: React.FC<BottomSheetHeaderProps> = ({ title, onClose }) => {
  return (
    <div className="p-5 border-b border-gray-200 text-center relative">
      <h3 className="text-xl font-bold text-gray-900 whitespace-pre-line leading-tight">{title}</h3>
      <button
        onClick={onClose}
        className="absolute left-5 top-5 text-2xl cursor-pointer text-gray-600 hover:text-gray-800"
      >
        ←
      </button>
    </div>
  );
};

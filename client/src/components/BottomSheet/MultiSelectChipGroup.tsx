import React from 'react';
import type { ChipOption } from '@app-types/meeting.types';

interface MultiSelectChipGroupProps {
  options: ChipOption[];
  selected: string[];
  onChange: (values: string[]) => void;
}

export const MultiSelectChipGroup: React.FC<MultiSelectChipGroupProps> = ({
  options,
  selected,
  onChange,
}) => {
  const handleToggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = selected.includes(option.value);
        return (
          <button
            key={option.value}
            onClick={() => handleToggle(option.value)}
            className={`px-4 py-2.5 rounded-full text-[15px] font-medium transition-all ${
              isSelected
                ? 'bg-gray-800 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {option.label}
          </button>
        );
      })}
      {/* Add Button */}
      <button
        className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};

import React from 'react';
import type { ChipOption } from '@app-types/meeting.types';
import { Chip } from '@components/UI/Chip';

interface ChipGroupProps {
  options: ChipOption[];
  selected: string;
  onChange: (value: string) => void;
}

export const ChipGroup: React.FC<ChipGroupProps> = ({ options, selected, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <Chip
          key={option.value}
          label={option.label}
          selected={selected === option.value}
          onClick={() => onChange(option.value)}
        />
      ))}
    </div>
  );
};

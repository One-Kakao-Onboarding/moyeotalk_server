import React from 'react';
import type { MeetingData } from '@app-types/meeting.types';
import { Input } from '@components/UI/Input';
import { Button } from '@components/UI/Button';
import { ChipGroup } from './ChipGroup';
import { WHEN_OPTIONS } from '@constants/meeting';

interface MeetingFormStep1Props {
  formData: MeetingData;
  onChange: (field: keyof MeetingData, value: string) => void;
  onNext: () => void;
}

export const MeetingFormStep1: React.FC<MeetingFormStep1Props> = ({
  formData,
  onChange,
  onNext,
}) => {
  const isValid = formData.departure && formData.destination && formData.when;

  return (
    <div>
      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-800 mb-3 block">출발하는 곳</label>
        <Input
          value={formData.departure}
          onChange={(value) => onChange('departure', value)}
          placeholder="예: 강남역, 집, 회사 등"
        />
      </div>

      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-800 mb-3 block">만나고 싶은 곳</label>
        <Input
          value={formData.destination}
          onChange={(value) => onChange('destination', value)}
          placeholder="예: 홍대, 신촌, 이태원 등"
        />
      </div>

      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-800 mb-3 block">만나고 싶을 때</label>
        <ChipGroup
          options={WHEN_OPTIONS}
          selected={formData.when}
          onChange={(value) => onChange('when', value)}
        />
      </div>

      <Button variant="primary" onClick={onNext} disabled={!isValid} className="w-full mt-5">
        다음
      </Button>
    </div>
  );
};

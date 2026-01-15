import React from 'react';
import type { MeetingData } from '@app-types/meeting.types';
import { Textarea } from '@components/UI/Textarea';
import { Button } from '@components/UI/Button';
import { ChipGroup } from './ChipGroup';
import { MOOD_OPTIONS, ACTIVITY_OPTIONS } from '@constants/meeting';

interface MeetingFormStep2Props {
  formData: MeetingData;
  onChange: (field: keyof MeetingData, value: string) => void;
  onSubmit: () => void;
}

export const MeetingFormStep2: React.FC<MeetingFormStep2Props> = ({
  formData,
  onChange,
  onSubmit,
}) => {
  const isValid = formData.mood && formData.activity;

  return (
    <div>
      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-800 mb-3 block">
          어떤 분위기를 원하시나요?
        </label>
        <ChipGroup
          options={MOOD_OPTIONS}
          selected={formData.mood}
          onChange={(value) => onChange('mood', value)}
        />
      </div>

      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-800 mb-3 block">
          무엇을 하고 싶으세요?
        </label>
        <ChipGroup
          options={ACTIVITY_OPTIONS}
          selected={formData.activity}
          onChange={(value) => onChange('activity', value)}
        />
      </div>

      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-800 mb-3 block">
          추가적으로 고려해야 할 점이 있나요?
        </label>
        <Textarea
          value={formData.additional}
          onChange={(value) => onChange('additional', value)}
          placeholder="예: 주차 가능한 곳, 룸이 있는 곳, 조용한 곳 등"
          rows={4}
        />
      </div>

      <Button variant="primary" onClick={onSubmit} disabled={!isValid} className="w-full mt-5">
        장소 추천 받기
      </Button>
    </div>
  );
};

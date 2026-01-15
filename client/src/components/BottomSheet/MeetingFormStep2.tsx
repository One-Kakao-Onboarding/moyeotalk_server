import React from 'react';
import type { MeetingData } from '@app-types/meeting.types';
import { Textarea } from '@components/UI/Textarea';
import { Button } from '@components/UI/Button';
import { ChipGroup } from './ChipGroup';
import { PLACE_COUNT_OPTIONS, MOOD_OPTIONS, ACTIVITY_OPTIONS } from '@constants/meeting';

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
  const isValid = formData.placeCount && formData.mood && formData.activity;

  return (
    <div>
      {/* 희망 장소 수 */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-800 mb-3 block">
          희망 장소 수
        </label>
        <ChipGroup
          options={PLACE_COUNT_OPTIONS}
          selected={formData.placeCount}
          onChange={(value) => onChange('placeCount', value)}
        />
      </div>

      {/* 원하는 분위기 */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-800 mb-3 block">
          원하는 분위기
        </label>
        <ChipGroup
          options={MOOD_OPTIONS}
          selected={formData.mood}
          onChange={(value) => onChange('mood', value)}
        />
      </div>

      {/* 하고 싶은 활동 */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-800 mb-3 block">
          하고 싶은 활동
        </label>
        <ChipGroup
          options={ACTIVITY_OPTIONS}
          selected={formData.activity}
          onChange={(value) => onChange('activity', value)}
        />
      </div>

      {/* 그 외 고려사항 */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-800 mb-3 block">
          그 외 고려사항
        </label>
        <Textarea
          value={formData.additional}
          onChange={(value) => onChange('additional', value)}
          placeholder="기타 원하시는 조건을 입력해주세요 (선택사항)"
          rows={3}
        />
      </div>

      <Button variant="primary" onClick={onSubmit} disabled={!isValid} className="w-full mt-5">
        제출하기
      </Button>
    </div>
  );
};

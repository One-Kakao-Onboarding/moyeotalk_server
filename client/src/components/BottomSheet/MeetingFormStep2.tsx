import React from 'react';
import type { MeetingData } from '@app-types/meeting.types';
import { Textarea } from '@components/UI/Textarea';
import { Button } from '@components/UI/Button';
import { MultiSelectChipGroup } from './MultiSelectChipGroup';
import { FOOD_OPTIONS, MOOD_OPTIONS, FACILITY_OPTIONS } from '@constants/meeting';

interface MeetingFormStep2Props {
  formData: MeetingData;
  onChangeArray: (field: 'foods' | 'moods' | 'facilities', values: string[]) => void;
  onChange: (field: keyof MeetingData, value: string) => void;
  onSubmit: () => void;
}

export const MeetingFormStep2: React.FC<MeetingFormStep2Props> = ({
  formData,
  onChangeArray,
  onChange,
  onSubmit,
}) => {
  const isValid = formData.foods.length > 0 || formData.moods.length > 0 || formData.facilities.length > 0;

  return (
    <div>
      {/* 먹고 싶은 것 */}
      <div className="mb-6">
        <label className="text-base font-semibold text-gray-900 mb-3 block">
          먹고 싶은 것
        </label>
        <MultiSelectChipGroup
          options={FOOD_OPTIONS}
          selected={formData.foods}
          onChange={(values) => onChangeArray('foods', values)}
        />
      </div>

      {/* 분위기 */}
      <div className="mb-6">
        <label className="text-base font-semibold text-gray-900 mb-3 block">
          분위기
        </label>
        <MultiSelectChipGroup
          options={MOOD_OPTIONS}
          selected={formData.moods}
          onChange={(values) => onChangeArray('moods', values)}
        />
      </div>

      {/* 편의시설 */}
      <div className="mb-6">
        <label className="text-base font-semibold text-gray-900 mb-3 block">
          편의시설
        </label>
        <MultiSelectChipGroup
          options={FACILITY_OPTIONS}
          selected={formData.facilities}
          onChange={(values) => onChangeArray('facilities', values)}
        />
      </div>

      {/* 그 외에 시간 고려해야 할 점 */}
      <div className="mb-6">
        <label className="text-base font-semibold text-gray-900 mb-3 block">
          그 외에 시간 고려해야 할 점이 있다면 알려주세요!
        </label>
        <Textarea
          value={formData.additional}
          onChange={(value) => onChange('additional', value)}
          placeholder="집이랑 가까운 곳에서 만나고 싶어요. 땅글 얼트리가 있어요."
          rows={4}
        />
      </div>

      {/* 힌트 텍스트 */}
      <p className="text-center text-sm text-blue-600 mb-4">
        게임을 만들면 <span className="text-blue-700 font-semibold">채팅방</span>에 공유돼요
      </p>

      <Button variant="primary" onClick={onSubmit} disabled={!isValid} className="w-full">
        제출하기
      </Button>
    </div>
  );
};

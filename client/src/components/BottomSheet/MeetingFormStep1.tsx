import React, { useState } from 'react';
import type { MeetingData } from '@app-types/meeting.types';
import { Button } from '@components/UI/Button';
import { LocationSearchModal } from '@components/UI/LocationSearchModal';
import { DateRangePicker } from '@components/UI/DateRangePicker';
import { DEPARTURE_OPTIONS, DESTINATION_OPTIONS } from '@constants/meeting';

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
  const [isDepartureSearchOpen, setIsDepartureSearchOpen] = useState(false);
  const [isDestinationSearchOpen, setIsDestinationSearchOpen] = useState(false);

  const isValid = formData.departure && formData.destination && formData.when;

  return (
    <div>
      {/* 출발하는 곳 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-semibold text-gray-800">출발하는 곳</label>
          <button
            onClick={() => setIsDepartureSearchOpen(true)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {DEPARTURE_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => onChange('departure', option.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                formData.departure === option.value
                  ? 'bg-kakao-yellow text-kakao-text'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
          {formData.departure &&
            !DEPARTURE_OPTIONS.find((opt) => opt.value === formData.departure) && (
              <button
                className="px-4 py-2 rounded-full text-sm font-medium bg-kakao-yellow text-kakao-text"
              >
                {formData.departure}
              </button>
            )}
        </div>
      </div>

      {/* 만나고 싶은 곳 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-semibold text-gray-800">만나고 싶은 곳</label>
          <button
            onClick={() => setIsDestinationSearchOpen(true)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {DESTINATION_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => onChange('destination', option.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                formData.destination === option.value
                  ? 'bg-kakao-yellow text-kakao-text'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
          {formData.destination &&
            !DESTINATION_OPTIONS.find((opt) => opt.value === formData.destination) && (
              <button
                className="px-4 py-2 rounded-full text-sm font-medium bg-kakao-yellow text-kakao-text"
              >
                {formData.destination}
              </button>
            )}
        </div>
      </div>

      {/* 만나고 싶을 때 */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-800 mb-3 block">만나고 싶을 때</label>
        <DateRangePicker
          value={formData.when}
          onChange={(value) => onChange('when', value)}
        />
      </div>

      <Button variant="primary" onClick={onNext} disabled={!isValid} className="w-full mt-5">
        다음
      </Button>

      {/* Location Search Modals */}
      <LocationSearchModal
        isOpen={isDepartureSearchOpen}
        onClose={() => setIsDepartureSearchOpen(false)}
        onSelect={(location) => onChange('departure', location)}
        title="출발하는 곳 검색"
      />
      <LocationSearchModal
        isOpen={isDestinationSearchOpen}
        onClose={() => setIsDestinationSearchOpen(false)}
        onSelect={(location) => onChange('destination', location)}
        title="만나고 싶은 곳 검색"
      />
    </div>
  );
};

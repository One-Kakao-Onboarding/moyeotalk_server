import React, { useRef, useEffect } from 'react';

interface TimeWheelPickerProps {
  selectedHour: number;
  selectedMinute: number;
  onHourChange: (hour: number) => void;
  onMinuteChange: (minute: number) => void;
  onConfirm: () => void;
  onClose: () => void;
}

export const TimeWheelPicker: React.FC<TimeWheelPickerProps> = ({
  selectedHour,
  selectedMinute,
  onHourChange,
  onMinuteChange,
  onConfirm,
  onClose,
}) => {
  const hourWheelRef = useRef<HTMLDivElement>(null);
  const minuteWheelRef = useRef<HTMLDivElement>(null);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const formatHour = (hour: number) => {
    if (hour === 0) return '12';
    if (hour > 12) return String(hour - 12);
    return String(hour);
  };

  const getPeriod = (hour: number) => {
    return hour >= 12 ? '오후' : '오전';
  };

  useEffect(() => {
    // Scroll to selected hour
    if (hourWheelRef.current) {
      const itemHeight = 48; // Height of each item
      hourWheelRef.current.scrollTop = selectedHour * itemHeight - itemHeight * 2;
    }
  }, [selectedHour]);

  useEffect(() => {
    // Scroll to selected minute
    if (minuteWheelRef.current) {
      const itemHeight = 48;
      minuteWheelRef.current.scrollTop = selectedMinute * itemHeight - itemHeight * 2;
    }
  }, [selectedMinute]);

  const handleHourScroll = () => {
    if (!hourWheelRef.current) return;
    const itemHeight = 48;
    const scrollTop = hourWheelRef.current.scrollTop;
    const index = Math.round((scrollTop + itemHeight * 2) / itemHeight);
    const clampedIndex = Math.max(0, Math.min(23, index));

    if (clampedIndex !== selectedHour) {
      onHourChange(clampedIndex);
    }
  };

  const handleMinuteScroll = () => {
    if (!minuteWheelRef.current) return;
    const itemHeight = 48;
    const scrollTop = minuteWheelRef.current.scrollTop;
    const index = Math.round((scrollTop + itemHeight * 2) / itemHeight);
    const clampedIndex = Math.max(0, Math.min(59, index));

    if (clampedIndex !== selectedMinute) {
      onMinuteChange(clampedIndex);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-[1001]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl z-[1002] pb-safe">
        <div className="max-w-[480px] mx-auto p-6">
          <h3 className="text-lg font-bold text-center mb-2">시간 선택</h3>
          <p className="text-sm text-gray-500 text-center mb-6">
            {getPeriod(selectedHour)} {formatHour(selectedHour)}:{String(selectedMinute).padStart(2, '0')}
          </p>

          {/* Time Wheels */}
          <div className="relative flex justify-center items-center gap-4 mb-6">
            {/* Selection Highlight */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-12 bg-gray-100 rounded-lg pointer-events-none" />

            {/* Hour Wheel */}
            <div
              ref={hourWheelRef}
              onScroll={handleHourScroll}
              className="w-24 h-60 overflow-y-scroll snap-y snap-mandatory scrollbar-hide relative"
              style={{ scrollbarWidth: 'none' }}
            >
              <div className="h-24" /> {/* Top padding */}
              {hours.map((hour) => (
                <div
                  key={hour}
                  className={`h-12 flex items-center justify-center text-2xl font-semibold snap-center transition-all ${
                    hour === selectedHour
                      ? 'text-blue-600 scale-110'
                      : 'text-gray-400'
                  }`}
                >
                  {formatHour(hour)}
                </div>
              ))}
              <div className="h-24" /> {/* Bottom padding */}
            </div>

            {/* Separator */}
            <div className="text-3xl font-bold text-gray-300">:</div>

            {/* Minute Wheel */}
            <div
              ref={minuteWheelRef}
              onScroll={handleMinuteScroll}
              className="w-24 h-60 overflow-y-scroll snap-y snap-mandatory scrollbar-hide relative"
              style={{ scrollbarWidth: 'none' }}
            >
              <div className="h-24" /> {/* Top padding */}
              {minutes.map((minute) => (
                <div
                  key={minute}
                  className={`h-12 flex items-center justify-center text-2xl font-semibold snap-center transition-all ${
                    minute === selectedMinute
                      ? 'text-blue-600 scale-110'
                      : 'text-gray-400'
                  }`}
                >
                  {String(minute).padStart(2, '0')}
                </div>
              ))}
              <div className="h-24" /> {/* Bottom padding */}
            </div>
          </div>

          {/* Confirm Button */}
          <button
            onClick={onConfirm}
            className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors"
          >
            확인
          </button>
        </div>
      </div>
    </>
  );
};

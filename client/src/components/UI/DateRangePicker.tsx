import React, { useState, useEffect } from 'react';
import { TimeWheelPicker } from './TimeWheelPicker';

interface DateRangePickerProps {
  value: string;
  onChange: (dateRange: string) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ value, onChange }) => {
  // Default to January 17, 2026
  const defaultDate = new Date(2026, 0, 17); // Month is 0-indexed (0 = January)
  const [currentMonth, setCurrentMonth] = useState(defaultDate);
  const [selectedDate, setSelectedDate] = useState<Date | null>(defaultDate);
  const [isAllDay, setIsAllDay] = useState(true);
  const [selectedHour, setSelectedHour] = useState(16); // Default 오후 4:00
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Set initial value on mount
  useEffect(() => {
    if (!value && selectedDate) {
      onChange(formatDate(selectedDate));
    }
  }, []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}. ${parseInt(month)}. ${parseInt(day)}`;
  };

  const formatTime = (hour: number, minute: number) => {
    const period = hour >= 12 ? '오후' : '오전';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${period} ${displayHour}:${String(minute).padStart(2, '0')}`;
  };

  const getDayOfWeek = (date: Date) => {
    const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    return days[date.getDay()];
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(clickedDate);

    // Update value
    const dateStr = formatDate(clickedDate);
    if (isAllDay) {
      onChange(dateStr);
    } else {
      onChange(`${dateStr} ${formatTime(selectedHour, selectedMinute)}`);
    }
  };

  const handleTimeClick = () => {
    if (!isAllDay) {
      setShowTimePicker(true);
    }
  };

  const handleTimeConfirm = () => {
    setShowTimePicker(false);
    if (selectedDate) {
      const dateStr = formatDate(selectedDate);
      if (isAllDay) {
        onChange(dateStr);
      } else {
        onChange(`${dateStr} ${formatTime(selectedHour, selectedMinute)}`);
      }
    }
  };

  const handleAllDayToggle = () => {
    const newAllDay = !isAllDay;
    setIsAllDay(newAllDay);

    if (selectedDate) {
      const dateStr = formatDate(selectedDate);
      if (newAllDay) {
        // If all day is enabled, don't include time
        onChange(dateStr);
      } else {
        // If all day is disabled, include time
        onChange(`${dateStr} ${formatTime(selectedHour, selectedMinute)}`);
      }
    }
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const isSelectedDate = (day: number) => {
    if (!selectedDate) return false;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date.toDateString() === selectedDate.toDateString();
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  const monthYear = `${currentMonth.getFullYear()}년 ${currentMonth.getMonth() + 1}월`;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xl font-bold text-gray-900">{monthYear}</span>
        <div className="flex gap-2">
          <button
            onClick={previousMonth}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextMonth}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-400 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {Array.from({ length: startingDayOfWeek }).map((_, index) => (
          <div key={`empty-${index}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const isSelected = isSelectedDate(day);

          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              className={`
                aspect-square flex items-center justify-center text-lg rounded-full
                ${isSelected ? 'bg-blue-600 text-white font-bold' : 'text-gray-900'}
                hover:bg-blue-100 transition-colors
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Hint Text */}
      <p className="text-center text-sm text-blue-600 mb-4">
        {selectedDate ? '' : '양식을 제출하면 채팅방에 공유돼요'}
      </p>

      {/* Selected Date Display */}
      {selectedDate && (
        <div className="flex items-center justify-between py-3 border-t border-gray-200">
          <span className="text-base text-gray-900">
            {formatDate(selectedDate)}. {getDayOfWeek(selectedDate)}
          </span>
          {!isAllDay && (
            <button
              onClick={handleTimeClick}
              className="text-base text-gray-900 hover:text-blue-600"
            >
              {formatTime(selectedHour, selectedMinute)}
            </button>
          )}
        </div>
      )}

      {/* All Day Toggle */}
      <div className="flex items-center justify-between py-3 border-t border-gray-200">
        <span className="text-base text-gray-900">하루 종일</span>
        <button
          onClick={handleAllDayToggle}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            isAllDay ? 'bg-blue-600' : 'bg-gray-300'
          }`}
        >
          <div
            className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
              isAllDay ? 'left-6' : 'left-0.5'
            }`}
          />
        </button>
      </div>

      {/* Time Picker Modal */}
      {showTimePicker && (
        <TimeWheelPicker
          selectedHour={selectedHour}
          selectedMinute={selectedMinute}
          onHourChange={setSelectedHour}
          onMinuteChange={setSelectedMinute}
          onConfirm={handleTimeConfirm}
          onClose={() => setShowTimePicker(false)}
        />
      )}
    </div>
  );
};

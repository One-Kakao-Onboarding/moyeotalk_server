import React from 'react';
import { useMeetingForm } from '@hooks/useMeetingForm';
import { useChatContext } from '@contexts';
import { BottomSheetHeader } from './BottomSheetHeader';
import { MeetingFormStep1 } from './MeetingFormStep1';
import { MeetingFormStep2 } from './MeetingFormStep2';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose }) => {
  const { formData, currentStep, updateField, goToStep2, validateStep2, resetForm } =
    useMeetingForm();
  const { requestRecommendation } = useChatContext();

  const handleNext = () => {
    const success = goToStep2();
    if (!success) {
      alert('모든 항목을 입력해주세요!');
    }
  };

  const handleSubmit = () => {
    if (!validateStep2()) {
      alert('희망 장소 수, 분위기, 활동을 모두 선택해주세요!');
      return;
    }

    requestRecommendation(formData);
    handleClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const stepTitle = currentStep === 1 ? '언제, 어디서 만날까요?' : '어떤 만남이 되면 좋겠어요?';

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-[999]"
          onClick={handleClose}
        />
      )}

      {/* Bottom Sheet */}
      <div
        className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white rounded-t-[20px] shadow-[0_-4px_20px_rgba(0,0,0,0.2)] transition-transform duration-300 z-[1000] max-h-[80vh] overflow-y-auto scrollbar-thin ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <BottomSheetHeader title={stepTitle} onClose={handleClose} />
        <div className="p-5">
          {currentStep === 1 ? (
            <MeetingFormStep1 formData={formData} onChange={updateField} onNext={handleNext} />
          ) : (
            <MeetingFormStep2 formData={formData} onChange={updateField} onSubmit={handleSubmit} />
          )}
        </div>
      </div>
    </>
  );
};

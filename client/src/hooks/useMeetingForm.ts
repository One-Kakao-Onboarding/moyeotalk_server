import { useState } from 'react';
import type { MeetingData } from '@app-types/meeting.types';

export const useMeetingForm = () => {
  const [formData, setFormData] = useState<MeetingData>({
    departure: '',
    destination: '',
    when: '',
    foods: [],
    moods: [],
    facilities: [],
    additional: '',
  });

  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  const updateField = (field: keyof MeetingData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateArrayField = (field: 'foods' | 'moods' | 'facilities', values: string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: values,
    }));
  };

  const goToStep2 = (): boolean => {
    // Validate step 1
    if (!formData.departure || !formData.destination || !formData.when) {
      return false;
    }
    setCurrentStep(2);
    return true;
  };

  const goToStep1 = () => {
    setCurrentStep(1);
  };

  const validateStep2 = (): boolean => {
    return formData.foods.length > 0 || formData.moods.length > 0 || formData.facilities.length > 0;
  };

  const resetForm = () => {
    setFormData({
      departure: '',
      destination: '',
      when: '',
      foods: [],
      moods: [],
      facilities: [],
      additional: '',
    });
    setCurrentStep(1);
  };

  return {
    formData,
    currentStep,
    updateField,
    updateArrayField,
    goToStep2,
    goToStep1,
    validateStep2,
    resetForm,
  };
};

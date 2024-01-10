import { ReactElement, useState } from "react";

interface IreturnUseMultistepForm {
  currentStep: number;
  prev: () => void;
  next: () => void;
  StepRender: ReactElement;
  isFirstStep: () => boolean;
  isLastStep: () => boolean;
  totalStep: number;
}

// a Factory function for Multi step Form or "Custom React Hook"
export function useMultistepForm(
  steps: ReactElement[]
): IreturnUseMultistepForm {
  const [currentStep, setCurrentStep] = useState(0);

  // To navigate to previous form
  // if false returned then do not show prev button as first page of form
  function prev() {
    if (!isFirstStep()) setCurrentStep((prev) => (prev = prev - 1));
  }

  // To navigate to next form
  function next() {
    if (!isLastStep()) setCurrentStep((prev) => (prev = prev + 1));
  }

  function isFirstStep(): boolean {
    if (currentStep === 0) return true;
    return false;
  }

  function isLastStep(): boolean {
    if (currentStep === steps.length - 1) return true;
    return false;
  }

  return {
    currentStep,
    prev,
    next,
    StepRender: steps[currentStep],
    isFirstStep,
    isLastStep,
    totalStep: steps.length,
  };
}

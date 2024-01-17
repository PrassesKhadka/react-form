"use client";

import React from "react";
import { useMultistepForm } from "./useMultistepForm";
import StudentAcademicForm from "./formComponents.tsx/studentAcademicForm";
import StudentDetailsForm from "./formComponents.tsx/studentDetailsForm";
import {
  useForm,
  SubmitHandler,
  Control,
  FieldErrors,
  UseFormSetValue,
  UseFormGetValues,
} from "react-hook-form";
import { Istudent } from "../interfaces";
import { studentOperations } from "../firebase/firestore/students";
import { useAuthObserver } from "../firebase/auth/useAuthObserver";

export interface IuseMultistepFormProps {
  control: Control<Istudent>;
  errors: FieldErrors<Istudent>;
  setValue: UseFormSetValue<Istudent>;
  getValues: UseFormGetValues<Istudent>;
}

const FormComponent = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<Istudent>({});

  const {
    currentStep,
    next,
    prev,
    StepRender,
    isFirstStep,
    isLastStep,
    totalStep,
  } = useMultistepForm([
    <StudentDetailsForm
      control={control}
      errors={errors}
      setValue={setValue}
      getValues={getValues}
    />,
    <StudentAcademicForm
      control={control}
      errors={errors}
      setValue={setValue}
      getValues={getValues}
    />,
  ]);
  const { currentUser } = useAuthObserver();

  const { createNewDoc, updateExistingDoc } = studentOperations();
  const userEmail = currentUser?.email ?? "";

  const handleOnNextClick: SubmitHandler<Istudent> = async (data: Istudent) => {
    console.log(data);
    if (isLastStep()) {
      try {
        const value = await createNewDoc(userEmail, data);
        console.log("Hi", value);
        return;
      } catch (error) {
        console.log(error);
        return;
      }
    }
    next();
  };

  return (
    <form
      onSubmit={handleSubmit(handleOnNextClick)}
      className="flex flex-col p-4 justify-around items-around border-blue-700 border-4  min-h-[80%] w-[25%]"
    >
      <span className="flex justify-end w-[100%]">
        {currentStep + 1} / {totalStep}
      </span>

      {/* Form rendered according to step  */}
      {StepRender}

      {/* For Buttons */}
      <div className="border-red-500 b-1 flex justify-end items-center">
        {!isFirstStep() && (
          <button
            type="button"
            onClick={prev}
            className="btn btn-active btn-neutral mr-2"
          >
            Back
          </button>
        )}
        {!isLastStep() ? (
          <button className="btn btn-active btn-neutral">Next</button>
        ) : (
          <button type="submit" className="btn btn-success text-white">
            Finish
          </button>
        )}
      </div>
    </form>
  );
};

export default FormComponent;

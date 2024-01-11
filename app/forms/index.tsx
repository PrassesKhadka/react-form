"use client";

import React from "react";
import { useMultistepForm } from "./useMultistepForm";
import StudentAcademicForm from "./formComponents.tsx/studentAcademicForm";
import StudentDetailsForm from "./formComponents.tsx/studentDetailsForm";
import { useForm, SubmitHandler, Control, FieldErrors } from "react-hook-form";
import { Istudent } from "../interfaces";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setStudentData } from "../redux/Slices/studentSlice";

export interface IuseMultistepFormProps {
  control: Control<Istudent>;
  errors: FieldErrors<Istudent>;
}

const FormComponent: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
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
    <StudentDetailsForm control={control} errors={errors} />,
    <StudentAcademicForm control={control} errors={errors} />,
  ]);

  // get the student data at this instance from redux store
  const studentData = useAppSelector((state) => state.student);
  const dispatch = useAppDispatch();

  const handleOnNextClick: SubmitHandler<Istudent> = (data: Istudent) => {
    console.log(errors);
    console.log(data);
    dispatch(setStudentData(data));
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

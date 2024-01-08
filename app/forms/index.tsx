"use client";

import React from "react";
import { useMultistepForm } from "./useMultistepForm";
import StudentAcademicForm from "./studentAcademicForm";
import StudentDetailsForm from "./studentDetailsForm";
import { useForm, SubmitHandler } from "react-hook-form";
import { Istudent } from "../interfaces";

const FormComponent: React.FC = () => {
  const {
    currentStep,
    next,
    prev,
    StepRender,
    isFirstStep,
    isLastStep,
    totalStep,
  } = useMultistepForm([<StudentDetailsForm />, <StudentAcademicForm />]);

  const { handleSubmit } = useForm<Istudent>({
    defaultValues: {
      fullname: "",
      dateOfBirth: "",
      gender: "male",
      profilePicture: "",
      level: "bachelors",
      faculty: "science",
      courses: "csit",
    },
  });

  const handleOnNext: SubmitHandler<Istudent> = (data: Istudent) => {
    next();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(handleOnNext)}>
      {/* Index number */}
      <span>
        {currentStep + 1}/{totalStep}
      </span>

      {/* Form rendered according to step  */}
      {StepRender}

      {/* For Buttons */}
      <div>
        {!isFirstStep() && (
          <button type="button" onClick={prev}>
            Back
          </button>
        )}
        {!isLastStep() ? (
          <button type="submit">Next</button>
        ) : (
          <button type="submit">Finish</button>
        )}
      </div>
    </form>
  );
};

export default FormComponent;

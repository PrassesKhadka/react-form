// Student Academic Information Form
"use client";

import { useForm, SubmitHandler, Controller, Form } from "react-hook-form";
import { Istudent } from "../interfaces";
import FormWrapper from "./formWrapper";

const StudentAcademicForm = () => {
  const {
    control,
    formState: { errors },
  } = useForm<Istudent>();

  return (
    <FormWrapper title="Academic Information">
      {/* For Level input */}
      <label>
        Level:
        <Controller
          control={control}
          name="level"
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <select className="select select-bordered w-full max-w-xs">
              <option disabled selected>
                Level
              </option>
              <option>Bachelor</option>
              <option>Master</option>
            </select>
          )}
        />
      </label>

      {/* Faculty Input */}
      <label>
        Faculty:
        <Controller
          control={control}
          name="faculty"
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <select className="select select-bordered w-full max-w-xs">
              <option disabled selected>
                Faculty
              </option>
              <option>Management</option>
              <option>Science</option>
            </select>
          )}
        />
        {errors.faculty && <span>{errors.faculty.message}</span>}
      </label>

      {/* Select Input
      <label>
        Select Input:
        <Controller
          control={control}
          name="selectInput"
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <select {...field}>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          )}
        />
        {errors.selectInput && <span>{errors.selectInput.message}</span>}
      </label>

      {/* Checkbox Input */}
      {/* <label>
        Checkbox Input:
        <Controller
          control={control}
          name="checkboxInput"
          render={({ field }) => <input type="checkbox" {...field} />}
        />
      </label>

      {/* Date of Birth Input */}
      {/* <label>
        Date of Birth:
        <Controller
          control={control}
          name="dobInput"
          rules={{ required: "This field is required" }}
          render={({ field }) => <input type="date" {...field} />}
        />
        {errors.dobInput && <span>{errors.dobInput.message}</span>}
      </label> */}
    </FormWrapper>
  );
};

export default StudentAcademicForm;

// Student Academic Information Form
"use client";

import {
  useForm,
  SubmitHandler,
  Controller,
  Form,
  Control,
  FieldError,
} from "react-hook-form";
import { Istudent } from "../../interfaces";
import FormWrapper from "../formWrapper";
import { IuseMultistepFormProps } from "..";

const StudentAcademicForm = ({ control, errors }: IuseMultistepFormProps) => {
  return (
    <FormWrapper title="Academic Information">
      {/* For Level input */}
      <label>
        <Controller
          control={control}
          name="level"
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <select
              {...field}
              className="select select-bordered w-full max-w-xs"
            >
              <option disabled selected>
                Level
              </option>
              <option value="bachelor">Bachelor</option>
              <option value="master">Master</option>
            </select>
          )}
        />
        <div className="label">
          <span className="label-text-alt text-red-700">
            {errors.level && errors.level?.message}
          </span>
        </div>
      </label>

      {/* Faculty Input */}
      <label>
        <Controller
          control={control}
          name="faculty"
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <select
              {...field}
              className="select select-bordered w-full max-w-xs"
            >
              <option disabled selected>
                Faculty
              </option>
              <option value="management">Management</option>
              <option value="science">Science</option>
            </select>
          )}
        />
        <div className="label">
          <span className="label-text-alt text-red-700">
            {errors.faculty && <span>{errors.faculty.message}</span>}
          </span>
        </div>
      </label>

      {/* Courses */}
      <label>
        <Controller
          control={control}
          name="courses"
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <select
              {...field}
              className="select select-bordered w-full max-w-xs"
            >
              <option disabled selected>
                Course
              </option>
              <option value="csit">BSc.CSIT</option>
              <option value="computer engineering">BE.Computer</option>
            </select>
          )}
        />
        <div className="label">
          <span className="label-text-alt text-red-700">
            {errors.courses && <span>{errors.courses.message}</span>}
          </span>
        </div>
      </label>

      {/* Checkbox Input */}
      <label>
        Choose your electives
        <Controller
          control={control}
          name="electives"
          render={({ field }) => (
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Image Processing</span>
                <input
                  {...field}
                  name="checkbox-1"
                  value="image processing"
                  type="checkbox"
                  className="checkbox"
                />
                <span className="label-text">Multimedia</span>
                <input
                  {...field}
                  name="checkbox-2"
                  value="multimedia"
                  type="checkbox"
                  className="checkbox"
                />
                <span className="label-text">Society and Ethics in IT</span>
                <input
                  {...field}
                  name="checkbox-3"
                  value="society and ethics in it"
                  type="checkbox"
                  className="checkbox"
                />
              </label>
            </div>
          )}
        />
      </label>
    </FormWrapper>
  );
};

export default StudentAcademicForm;

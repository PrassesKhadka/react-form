"use client";
import React from "react";
import { Controller } from "react-hook-form";
import FormWrapper from "../formWrapper";
import { IuseMultistepFormProps } from "..";

const StudentDetailsForm = ({ control, errors }: IuseMultistepFormProps) => {
  return (
    <FormWrapper title="Details Form">
      {/* For full name */}
      <label>
        <Controller
          name="fullname"
          control={control}
          rules={{
            required: "This field is required",
            pattern: {
              // regex for not a digit
              value: /^[A-Za-z]+$/,
              message: "shouldn't contain a number",
            },
          }}
          render={({ field }) => (
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">What is your name?</span>
              </div>
              <input
                {...field}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
              <div className="label">
                <span className="label-text-alt text-red-700">
                  {errors.fullname && errors.fullname?.message}
                </span>
              </div>
            </label>
          )}
        />
      </label>

      {/* For Date of Birth */}

      {/* For gender */}
      <label>
        <div className="label">
          <span className="label-text">What is your gender?</span>
        </div>
        <Controller
          name="gender"
          rules={{ required: "This field is required" }}
          control={control}
          render={({ field: { onChange, value } }) => (
            <div>
              <span className="label-text">male</span>
              <input
                checked={value === "male"}
                onChange={onChange}
                value="male"
                type="radio"
                name="radio-1"
                className="radio"
              />
              <span className="label-text">female</span>
              <input
                checked={value === "female"}
                onChange={onChange}
                value="female"
                type="radio"
                name="radio-2"
                className="radio"
              />
              <span className="label-text">others</span>
              <input
                checked={value === "others"}
                onChange={onChange}
                value="others"
                type="radio"
                name="radio-3"
                className="radio"
              />
              <div className="label">
                <span className="label-text-alt text-red-700">
                  {errors.gender && errors.gender?.message}
                </span>
              </div>
            </div>
          )}
        />
      </label>

      {/* File Input -> upload profile picture*/}
      <label>
        <Controller
          control={control}
          name="profilePicture"
          rules={{ required: "This field is required" }}
          render={({ field: { value, onChange, ...field } }) => (
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Choose a photo</span>
              </div>
              <input
                {...field}
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
              />
              <div className="label">
                <span className="label-text-alt text-red-700">
                  {errors.profilePicture && errors.profilePicture?.message}
                </span>
              </div>
            </label>
          )}
        />
      </label>
    </FormWrapper>
  );
};

export default StudentDetailsForm;

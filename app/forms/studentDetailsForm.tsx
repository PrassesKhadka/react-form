"use client";
import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Istudent } from "../interfaces";
import FormWrapper from "./formWrapper";

const StudentDetailsForm = () => {
  const { control } = useForm<Istudent>();

  return (
    <FormWrapper title="Details Form">
      {/* For full name */}
      <label>
        Full name:
        <Controller
          name="fullname"
          control={control}
          render={({ field }) => (
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">What is your name?</span>
                <span className="label-text-alt">Top Right label</span>
              </div>
              <input
                {...field}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
              <div className="label">
                <span className="label-text-alt">Bottom Left label</span>
                <span className="label-text-alt">Bottom Right label</span>
              </div>
            </label>
          )}
        />
      </label>

      {/* For Date of Birth */}

      {/* For gender */}
      <label>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <div>
              <span className="label-text">male</span>
              <input type="radio" name="radio-1" className="radio" />
              <span className="label-text">female</span>
              <input type="radio" name="radio-2" className="radio" />
              <span className="label-text">others</span>
              <input type="radio" name="radio-3" className="radio" />
            </div>
          )}
        />
      </label>

      {/* File Input -> upload profile picture*/}
      <label>
        Choose a photo
        <Controller
          control={control}
          name="profilePicture"
          render={({ field }) => (
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Pick a file</span>
                <span className="label-text-alt">Alt label</span>
              </div>
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
              />
              <div className="label">
                <span className="label-text-alt">Alt label</span>
                <span className="label-text-alt">Alt label</span>
              </div>
            </label>
          )}
        />
      </label>
    </FormWrapper>
  );
};

export default StudentDetailsForm;

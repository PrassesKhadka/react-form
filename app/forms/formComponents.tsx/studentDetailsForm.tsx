"use client";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import FormWrapper from "../formWrapper";
import { IuseMultistepFormProps } from "..";
import { useAccessStorage } from "@/app/firebase/storage/useAccessStorage";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { setStudentData } from "@/app/redux/Slices/studentSlice";

const StudentDetailsForm = ({ control, errors }: IuseMultistepFormProps) => {
  const [profilePicture, setProfilePicture] = useState<File>(
    new File([], "public/assets/images/avatar.png")
  );
  const { getName, uploadFile, getData } = useAccessStorage(profilePicture);
  // get redux
  const currentState = useAppSelector((prev) => prev);
  const dispatch = useAppDispatch();

  useEffect(() => {
    uploadFile();
    if (profilePicture) {
      const { progressMessage, errorMessage, downloadUrl } = getData;
      dispatch(
        setStudentData({ ...currentState, profilePicture: downloadUrl })
      );
    }
  }, [profilePicture]);

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
                <span className="label-text">What is your full name?</span>
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
      <label>
        <div className="label">
          <span className="label-text">what is your date of birth?</span>
        </div>
        <Controller
          name="dateOfBirth"
          control={control}
          rules={{ required: "This field is required" }}
          render={({ field }) => <input {...field} type="date" />}
        ></Controller>
        <div className="label">
          <span className="label-text-alt text-red-700">
            {errors.dateOfBirth && errors.dateOfBirth?.message}
          </span>
        </div>
      </label>

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
          // rules={{ required: "This field is required" }}
          render={({ field: { value, onChange, ...field } }) => (
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Choose a photo</span>
              </div>
              <input
                type="file"
                onChange={(e) => {
                  setProfilePicture((prev) =>
                    // was showing error so given condition for what should happen when null state occur
                    e.target.files ? (prev = e.target.files[0]) : (prev = prev)
                  );
                }}
                accept="image/*"
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

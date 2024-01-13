"use client";

import Toast from "@/app/components/toast";
import { registerUser, loginUser } from "@/app/firebase/auth/auth";
import { useAuthObserver } from "@/app/firebase/auth/useAuthObserver";
import { IuserEmailAndPassword } from "@/app/interfaces";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Login() {
  // Log in message
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IuserEmailAndPassword>();
  const { currentUser, loginStatus } = useAuthObserver();
  const router = useRouter();

  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch("/pages/dashboard");
  }, [router]);

  const onSubmit: SubmitHandler<IuserEmailAndPassword> = async (data, e) => {
    e?.preventDefault();
    loginUser(data);
    console.log(currentUser);
    if (currentUser) {
      router.replace("/dashboard");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              {...register("email", { required: true })}
              aria-invalid={errors.email ? "true" : "false"}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="email"
              placeholder="Username"
            ></input>
            <p className="text-red-500 text-xs italic">
              {errors.email?.type === "required" && (
                <p role="alert">Enter a valid email </p>
              )}
            </p>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              {...register("password", { required: true })}
              aria-invalid={errors.password ? "true" : "false"}
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="********"
            ></input>
            <p className="text-red-500 text-xs italic">
              {errors.password?.type === "required" && (
                <p role="alert">Password is required</p>
              )}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {loginStatus === "checking" ? "Loading..." : "Sign In"}
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2024 @PrassesKhadka. All rights reserved.
        </p>
      </div>
    </div>
  );
}

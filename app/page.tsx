// Reference:
// https://nextjs.org/docs/pages/api-reference/functions/use-router
// useRouter from next/navigation used outside page directory and form next/router used inside pages directory

"use client";

import React from "react";
import FormComponent from "./forms";
import { useAuthObserver } from "./firebase/auth/useAuthObserver";
// useRouter from next/navigation and next/router
import { redirect, useRouter } from "next/navigation";

const Home = () => {
  const { currentUser, loginStatus } = useAuthObserver();
  const router = useRouter();
  if (currentUser) {
    router.replace("/dashboard");
    redirect("/dashboard");
  } else {
    router.push("/login");
  }

  return (
    <div className="flex justify-center items-center border-blue-700 border-4 h-[95vh] w-full">
      {/* <FormComponent /> */}
    </div>
  );
};

export default Home;

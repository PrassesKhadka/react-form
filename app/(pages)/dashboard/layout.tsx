"use client";

// This a layout for the dashboard route
import React from "react";
import { ReactNode } from "react";
import Navbar from "@/app/components/Navbar";
import { useAuthObserver } from "@/app/firebase/auth/useAuthObserver";
import { redirect } from "next/navigation";

interface IlayoutProps {
  children: ReactNode;
}
export default function Layout({ children }: IlayoutProps) {
  const { currentUser } = useAuthObserver();

  return (
    <>
      <Navbar title="Student Dashboard" />
      <main>{children}</main>
    </>
  );
}

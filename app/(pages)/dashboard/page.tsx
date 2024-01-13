// Reference: https://www.freecodecamp.org/news/secure-routes-in-next-js/
"use client";
import React, { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuthObserver } from "@/app/firebase/auth/useAuthObserver";
import Layout from "./layout";

type DashboardProps = {};

const Dashboard: React.FC<DashboardProps> = ({}) => {

  return <><Layout>This is a dashboard</Layout></>;
};

export default Dashboard;

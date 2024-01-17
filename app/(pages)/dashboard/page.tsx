// Reference: https://www.freecodecamp.org/news/secure-routes-in-next-js/
"use client";

import React, { useState, useEffect } from "react";
import { useAuthObserver } from "@/app/firebase/auth/useAuthObserver";
import Link from "next/link";
import usePagination from "@/app/table/usePagination";
import PageNavigation from "@/app/table/PageNavigation";
import { professorOperations } from "@/app/firebase/firestore/professors";
import { IuserDocument } from "@/app/interfaces";

type DashboardProps = {};

const Dashboard: React.FC<DashboardProps> = ({}) => {
  // const [data, setData] = useState<IuserDocument[]>([]);
  const { previous, next, goTo, totalPages, pageData } = usePagination({
    collectionName: "students",
  });
  console.log(pageData);
  return (
    <>
      <div className="overflow-x-auto">
        <Link href="/dashboard/new">
          <button className="btn btn-outline btn-success">
            Add a new student
          </button>
        </Link>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Academic Information</th>
              <th>Date of Birth</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((data: IuserDocument) => {
              const {
                profilePicture,
                fullname,
                dateOfBirth,
                gender,
                level,
                faculty,
                courses,
              } = data.studentData;

              return (
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={profilePicture}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{fullname}</div>
                        <div className="text-sm opacity-50">{gender}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {courses}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {level}, {faculty}
                    </span>
                  </td>
                  <td>{dateOfBirth}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              );
            })}
          </tbody>

          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
      <PageNavigation totalPages={totalPages} next={next} previous={previous} />
    </>
  );
};

export default Dashboard;

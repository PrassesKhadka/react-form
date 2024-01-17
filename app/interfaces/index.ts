import { User } from "firebase/auth";
import { FieldValue } from "firebase/firestore";

// Interface for user email and password
export interface IuserEmailAndPassword {
  email: string;
  password: string;
}

export type Tuser = User | null;
export type TloginStatus = "checking" | true | false;

export type Tgender = "male" | "female" | "others";
export type Tlevel = "bachelor" | "master";
export type Tfaculty = "science" | "management";
export type Tcourses = "csit" | "computer engineering";

// This is the data retrieved from the form
export interface Istudent {
  fullname: string;
  dateOfBirth: string;
  gender: Tgender;
  // image's link to the firebase storage
  profilePicture: string;
  level: Tlevel;
  faculty: Tfaculty;
  courses: Tcourses;
}

// student document created at firestore
export interface IuserDocument {
  id: string; // uid
  email: string; // emailid
  studentData: Istudent;
  createdAt: FieldValue;
  lastUpdatedAt: FieldValue;
}

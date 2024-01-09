import { User } from "firebase/auth";

// Interface for user email and password
export interface IuserEmailAndPassword {
  email: string;
  password: string;
}

export type Tuser = User | null;

export type TloginStatus = "checking" | true | false;

export type Tgender = "male" | "female" | "others";
export type Tlevel = "bachelor" | "master";
export type Tfaculty = "science";
export type Tcourses = "csit" | "environmentScience" | "engineering";

export interface Istudent {
  fullname: string;
  dateOfBirth: string;
  gender: Tgender;
  profilePicture: FileList;
  level: Tlevel;
  faculty: Tfaculty;
  courses: Tcourses;
}

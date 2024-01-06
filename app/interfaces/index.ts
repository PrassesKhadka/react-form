import { User } from "firebase/auth";

// Interface for user email and password
export interface IuserEmailAndPassword {
  email: string;
  password: string;
}

export type Tuser = User | null;

export type TloginStatus = "checking" | true | false;

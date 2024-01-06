import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { authInit } from "../initialize";
import { IuserEmailAndPassword } from "@/app/interfaces";

export function loginUser({ email, password }: IuserEmailAndPassword) {
  signInWithEmailAndPassword(authInit, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorMessage);
    });
}

export function logoutUser() {
  signOut(authInit)
    .then((userCredential) => {
      // Signed out
      console.log("User signed out !!!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorMessage);
    });
}

export function registerUser({ email, password }: IuserEmailAndPassword) {
  createUserWithEmailAndPassword(authInit, email, password)
    .then((userCredential) => {
      // New user registered
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorMessage);
    });
}

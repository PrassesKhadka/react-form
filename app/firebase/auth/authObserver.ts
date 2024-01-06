import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { authInit } from "../initialize";
import { Tuser, TloginStatus } from "@/app/interfaces";

export function authObserver() {
  const [currentUser, setCurrentUser] = useState<Tuser>(null);
  const [loginStatus, setLoginStatus] = useState<TloginStatus>("checking");

  useEffect(() => {
    // This observer gets called whenever the user's sign-in state changes.
    onAuthStateChanged(authInit, (user: Tuser) => {
      if (user) {
        setCurrentUser(user);
        setLoginStatus(true);
      } else {
        setCurrentUser(null);
        setLoginStatus(false);
      }
    });

    // Cleanup this using return but why???? Let's see
  }, []);

  return { currentUser, loginStatus };
}

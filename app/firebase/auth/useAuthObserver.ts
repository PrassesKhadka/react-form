import { useState, useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { authInit } from "../initialize";
import { Tuser, TloginStatus } from "@/app/interfaces";

interface IreturnAuthObserver {
  currentUser: Tuser;
  loginStatus: TloginStatus;
}

// Creating a custom react hook:
export function useAuthObserver(): IreturnAuthObserver {
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

    // clean up
    return () => {
      onAuthStateChanged;
    };
  }, []);

  return { currentUser, loginStatus };
}

import { useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
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
    // This observer gets called whenever the user's sign-in,
    // thus once user login,out state changes and rerendering happens and
    // the user name and all will be reflected.
    const unsubscriber = onAuthStateChanged(authInit, (user: Tuser) => {
      if (user) {
        setCurrentUser(user);
        setLoginStatus(true);
      } else {
        setCurrentUser(null);
        setLoginStatus(false);
      }
      console.log("onAuthStateChanged run");
    });
    console.log("useAuthObserver useEffect run");

    // clean up
    return () => unsubscriber();
  }, []);

  return { currentUser, loginStatus };
}

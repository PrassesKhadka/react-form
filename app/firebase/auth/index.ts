import { loginUser, logoutUser, registerUser } from "./auth";
import { useAuthObserver } from "./useAuthObserver";

export const auth = {
  registerUser,
  loginUser,
  logoutUser,
  useAuthObserver,
};

import { loginUser, logoutUser, registerUser } from "./auth";
import { authObserver } from "./authObserver";

export const auth = {
  registerUser,
  loginUser,
  logoutUser,
  authObserver,
};

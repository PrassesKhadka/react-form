import { studentOperations } from "./students";
import { professorOperations } from "./professors";

// Student can only create account and update their account
export const firestoreOperations = { studentOperations, professorOperations };

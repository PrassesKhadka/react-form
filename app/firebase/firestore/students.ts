import { authInit, db, collectionStudents } from "../initialize";
import { auth } from "..";
import {
  doc,
  DocumentData,
  DocumentReference,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { IuserDocument } from "@/app/interfaces";

interface IreturnStudentOperations {
  createNewDoc: (email: string) => Promise<void>;
}

// not a custom react hook nor a react functional component so cannot use useState or jsx;
export function studentOperations(): IreturnStudentOperations {
  // will always refer to current auth id
  function currentAuthUserReference(): DocumentReference<DocumentData> | null {
    let { currentUser } = authInit;
    return currentUser ? doc(db, collectionStudents, currentUser.uid) : null;
  }

  // when user registers #authenticates the auth id is captured by
  // currentUserAuthReference and that id is used to createNewDoc for
  // each student in Firestore
  async function createNewDoc(email: string): Promise<void> {
    let docRef = currentAuthUserReference();
    // try not to nest stuffs #don't use else
    if (!docRef) return;

    let docData: IuserDocument = {
      id: docRef.id, // is uid of authenticated user
      email: email,
      createdAt: serverTimestamp(),
      lastUpdatedAt: serverTimestamp(),
      studentData: {
        fullname: "",
        dateOfBirth: "",
        gender: "male",
        profilePicture: "../../../public/assets/images/avatar.png",
        level: "bachelor",
        faculty: "science",
        courses: "csit",
      },
    };
  }

  return { createNewDoc };
}

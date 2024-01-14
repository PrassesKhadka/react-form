import { authInit, db, collectionStudents } from "../initialize";
import {
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { Istudent, IuserDocument } from "@/app/interfaces";

interface IreturnStudentOperations {
  createNewDoc: (email: string) => Promise<boolean | undefined>;
  updateExistingDoc: (studentData: Istudent) => Promise<boolean | undefined>;
}

// a student can create and update it' own data that's it
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
  // creates a new document -> id will be the authenticated user's id
  async function createNewDoc(email: string): Promise<boolean | undefined> {
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

    // addDoc and setDoc difference is that: In setDoc,we need to define the id while in addDoc,firebase autogenerates the id
    try {
      await setDoc(docRef, docData);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // student should be able to update it's own document
  async function updateExistingDoc(
    studentData: Istudent
  ): Promise<boolean | undefined> {
    const docRef = currentAuthUserReference();
    if (!docRef) return;

    try {
      const userDoc = await getDoc(docRef);
      const updatedDoc = {
        ...userDoc,
        studentData,
        lastUpdatedAt: serverTimestamp(),
      };
      await updateDoc(docRef, updatedDoc);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  return { createNewDoc, updateExistingDoc };
}

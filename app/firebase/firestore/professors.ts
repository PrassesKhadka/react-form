// professors are the admin and can see all students data

import { collection, getDocs } from "firebase/firestore";
import { collectionStudents, db } from "../initialize";

export function professorOperations() {
  async function getAllStudentsDoc() {
    console.log("hi what's up all");
    const collectionRef = collection(db, collectionStudents);
    const collectionSnapshot = await getDocs(collectionRef);
    return collectionSnapshot;
  }

  return { getAllStudentsDoc };
}

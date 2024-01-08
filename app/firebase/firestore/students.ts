import { authInit, db, collectionStudents } from "../initialize";
import { auth } from "..";
import {
  doc,
  DocumentData,
  DocumentReference,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { Tuser } from "@/app/interfaces";

function studentOperations() {
  const createNewDoc = () => {};
}

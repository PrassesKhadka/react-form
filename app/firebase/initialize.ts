// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCra5XVEO_S3Pr5xdtOa_Ft9baIMYnCeI",
  authDomain: "college-management-syste-382bc.firebaseapp.com",
  projectId: "college-management-syste-382bc",
  storageBucket: "college-management-syste-382bc.appspot.com",
  messagingSenderId: "770361867187",
  appId: "1:770361867187:web:20cb655dcdd2ac22d669c6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const authInit = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// export collection names
export const collectionStudents = "students";
export const collectionCourses = "courses";
export const collectionProfessors = "professors";

// Get a non-default Storage bucket
export const storage = getStorage(app);

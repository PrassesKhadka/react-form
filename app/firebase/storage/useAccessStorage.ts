// Reference: https://firebase.google.com/docs/storage/web/upload-files and https://www.youtube.com/watch?v=D9W7AFeJ3kk
import { useState } from "react";
import { storage } from "../initialize";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

interface IreturnUseAccessStorage {
  uploadFile?: () => void;
  getName: () => string;
  progressMessage: string;
  errorMessage: string;
  downloadUrl: string;
  stateMessage: string;
}

// React custom hook -> you can include useState and useEffect inside it unlike factory functions where you cannot
export function useAccessStorage(file: File): IreturnUseAccessStorage {
  const [progressMessage, setProgressMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const [stateMessage, setStateMessage] = useState<string>("");

  if (!file)
    return {
      progressMessage,
      errorMessage,
      downloadUrl,
      stateMessage,
      getName,
    };

  // if you refer to multiple files with the same name, it will overwrite so to prevent this,we have used date to create a unique file name
  const fileUniqueName = new Date().getTime() + file.name;
  const storageRef = ref(storage, fileUniqueName);

  function getName(): string {
    return fileUniqueName;
  }

  function uploadFile() {
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setProgressMessage("Upload is " + progress + "% done");

        switch (snapshot.state) {
          case "paused":
            setStateMessage("Upload is paused");
            break;
          case "running":
            setStateMessage("Upload is running");
            break;
        }
      },
      (error) => {
        setErrorMessage(`${error.message}`);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setDownloadUrl(downloadURL);
        });
      }
    );
  }

  return {
    uploadFile,
    getName,
    progressMessage,
    errorMessage,
    downloadUrl,
    stateMessage,
  };
}

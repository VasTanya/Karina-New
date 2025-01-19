import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { serviceAccount } from "./firebaseCredentials";

let app, storage;
try {
  app = initializeApp(serviceAccount);
  storage = getStorage(app);
} catch (error) {
  console.error("[FRB-SDK]: SDK FAILED TO INITIALIZE", error.message);
}

export { app, storage };

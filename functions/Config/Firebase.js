import { initializeApp, cert } from "firebase-admin/app";
// import { storage } from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase/storage";
import { serviceAccount } from "./FirebaseCredentials.js";
import logger from "../Utils/Logger/Logger.js";
console.log(serviceAccount);
try {
  initializeApp({
    credential: cert(serviceAccount),
  });
  logger.info("DB INITIALIZED");
} catch (error) {
  logger.error("SDK FAILED TO INITIALIZE", error.message);
  process.exit(1);
}

const db = getFirestore();
// const storage = getStorage();
// const bucket = storage().bucket();

export const connection = async () => {
  try {
    await db.collection("test").limit(1).get();
    logger.info("CONNECTED TO DB");
  } catch (error) {
    logger.error("ERROR CONNECTING TO DB", error.message);
    process.exit(1);
  }
};

export { db };

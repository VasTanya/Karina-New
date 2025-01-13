import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { serviceAccount } from "./FirebaseCredentials.js";
import StorageManager from "../Manager/StorageManager.js";
import logger from "../Utils/Logger/Logger.js";

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: serviceAccount.storageBucket,
  });
  logger.info("[FRB-SDK]: DB INITIALIZED");
} catch (error) {
  logger.error("[FRB-SDK]: SDK FAILED TO INITIALIZE", error.message);
  process.exit(1);
}

const db = getFirestore();
const storage = new StorageManager(admin.storage());

export const connection = async () => {
  try {
    await db.collection("test").limit(1).get();
    logger.info("[FRB-SDK]: CONNECTED TO DB");
  } catch (error) {
    logger.error("[FRB-SDK]: ERROR CONNECTING TO DB", error.message);
    process.exit(1);
  }
};

export { db, storage };

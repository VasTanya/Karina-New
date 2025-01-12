import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { serviceAccount } from "./FirebaseCredentials.js";
import StorageManager from "./StorageManager.js";
import logger from "../Utils/Logger/Logger.js";

try {
  const app = initializeApp({ credential: cert(serviceAccount) });
  const storage = new StorageManager(app);
  logger.info("[FRB-SDK]: DB INITIALIZED");
} catch (error) {
  logger.error("[FRB-SDK]: SDK FAILED TO INITIALIZE", error.message);
  process.exit(1);
}

const db = getFirestore();

export const connection = async () => {
  try {
    await db.collection("test").limit(1).get();
    logger.info("[FRB-SDK]: CONNECTED TO DB");
  } catch (error) {
    logger.error("[FRB-SDK]: ERROR CONNECTING TO DB", error.message);
    process.exit(1);
  }
};

export { db };

import * as functions from "firebase-functions/v2";
import logger from "./Utils/Logger/Logger.js";

import albumsApp from "./App/AlbumsApp.js";
import basicsApp from "./App/BasicsApp.js";
import emailApp from "./App/EmailApp.js";
import adminApp from "./App/AdminApp.js";
import { cleanUpCustomDesigns } from "./App/SchedulerApp.js";

export const albums = functions.https.onRequest(albumsApp);
export const basics = functions.https.onRequest(basicsApp);
export const email = functions.https.onRequest(emailApp);
export const admin = functions.https.onRequest(adminApp);

export const cleanUpCustomDesignsScheduler = cleanUpCustomDesigns;

logger.info(`[INDEX]: SERVER DEPLOYED ON PROD`);

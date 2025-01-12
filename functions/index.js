import * as functions from "firebase-functions/v2";
import logger from "./Utils/Logger/Logger.js";

import albumsApp from "./App/AlbumsApp.js";
import basicsApp from "./App/BasicsApp.js";
import emailApp from "./App/EmailApp.js";
import adminApp from "./App/AdminApp.js";

export const albums = functions.https.onRequest(albumsApp);
export const basics = functions.https.onRequest(basicsApp);
export const email = functions.https.onRequest(emailApp);
export const admin = functions.https.onRequest(adminApp);

logger.info(`[INDEX]: SERVER DEPLOYED ON PROD`);

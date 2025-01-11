import * as functions from "firebase-functions/v2";
import logger from "./Utils/Logger/Logger.js";
import developmentApp from "./App/developmentApp.js";
import albumsApp from "./App/albumsApp.js";
import basicsApp from "./App/basicsApp.js";
import emailApp from "./App/emailApp.js";
import adminApp from "./App/adminApp.js";

export const albums = functions.https.onRequest(albumsApp);
export const basics = functions.https.onRequest(basicsApp);
export const email = functions.https.onRequest(emailApp);
export const admin = functions.https.onRequest(adminApp);

logger.info(`[INDEX]: SERVER LIVE ON ${process.env.ENVIRONMENT}`);

// if (process.env.ENVIRONMENT === "DEV") {
//   developmentApp.listen(process.env.OUT_PORT, () => {
//     logger.info(
//       `SERVER LIVE ON ${process.env.ENVIRONMENT} PORT ${process.env.OUT_PORT}`
//     );
//   });
// }

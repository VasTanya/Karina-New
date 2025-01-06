import logger from "./Utils/Logger/Logger.js";
import { Connection } from "./Config/Firebase.js";
import app from "./app.js";

if (process.env.ENVIRONMENT === "dev") {
  app.listen(process.env.PORT, () => {
    Connection();
    logger.info(`SERVER LIVE AT ${process.env.PORT}`);
  });
} else {
  // const privateKey = fs.readFileSync(
  //   "/etc/letsencrypt/live/karinas515.com/privkey.pem",
  //   "utf8"
  // );
  // const certificate = fs.readFileSync(
  //   "/etc/letsencrypt/live/karinas515.com/fullchain.pem",
  //   "utf8"
  // );
  // const certCredentials = { key: privateKey, cert: certificate };
  // const httpsServer = https.createServer(certCredentials, app);
  // httpsServer.listen(process.env.PORT, () => {
  //   logger.info(`HTTPS SERVER RUNNING AT ${process.env.PORT}`);
  // });
}

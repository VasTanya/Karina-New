import { execSync } from "child_process";
import dotenv from "dotenv";
import { ENV_VARS_LIST } from "./Constants.js";
import logger from "./Logger/Logger.js";

dotenv.config();

class EnvironmentManager {
  constructor() {
    this.loadEnvironment();
  }

  loadEnvironment() {
    if (process.env.ENVIRONMENT === "DEV") {
      dotenv.config();
    } else {
      this.loadFirebaseConfig();
    }
  }

  loadFirebaseConfig() {
    try {
      const result = execSync("firebase functions:config:get", {
        encoding: "utf8",
      });
      return JSON.parse(result);
    } catch (error) {
      logger.error("[ENV-MNGR]: ERROR LOADING FIREBASE CONFIG:", error);
      return {};
    }
  }

  getCurrentFirebaseEnv() {
    return this.loadFirebaseConfig();
  }

  setFirebaseEnv(vars) {
    for (const [key, value] of Object.entries(vars)) {
      const cmd = `firebase functions:config:set ${key}="${value}"`;
      try {
        execSync(cmd, { stdio: "inherit" });
        logger.info(`[ENV-MNGR]: SUCCESSFULLY SET ${key}`);
      } catch (error) {
        logger.error(`[ENV-MNGR]: FAILED TO SET ${key}:`, error);
      }
    }
  }

  setEnvironment() {
    const localEnvVars = {};
    const newEnvVars = {};
    const currentEnvVars = this.getCurrentFirebaseEnv();

    for (const [key, value] of Object.entries(process.env)) {
      if (ENV_VARS_LIST[key] && value) {
        localEnvVars[ENV_VARS_LIST[key]] = value;
      }
    }

    for (const [key, value] of Object.entries(localEnvVars)) {
      const [parentKey, childKey] = key.split(".");
      if (
        !currentEnvVars[parentKey][childKey] ||
        (currentEnvVars[parentKey][childKey] &&
          currentEnvVars[parentKey][childKey] !== value)
      ) {
        newEnvVars[key] = value;
        logger.info(`[ENV-MNGR]: NEW OR UPDATED VARIABLE DETECTED: ${key}`);
      }
    }

    if (Object.keys(newEnvVars).length) {
      this.setFirebaseEnv(newEnvVars);
      logger.info("[ENV-MNGR]: FINISHED UPDATING FIREBASE ENVIRONMENT");
    } else {
      logger.info("[ENV-MNGR]: NO NEW VARIABLES DETECTED");
    }
  }
}

export default new EnvironmentManager().setEnvironment();

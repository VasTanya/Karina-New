import { execSync } from "child_process";
import dotenv from "dotenv";
import { ENV_VARS_LIST } from "../Utils/Constants.js";
import logger from "../Utils/Logger/Logger.js";

dotenv.config();

class EnvironmentManager {
  constructor() {
    this.env = dotenv.config({
      path: `./.env.${process.env.NODE_ENV || "production"}`,
    }).parsed;
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
    try {
      return this.loadFirebaseConfig();
    } catch (error) {
      logger.error("[ENV-MNGR]: ERROR LOADING FIREBASE CONFIG:", error);
      return {};
    }
  }

  setFirebaseEnv(vars) {
    try {
      for (const [key, value] of Object.entries(vars)) {
        const cmd = `firebase functions:config:set ${key}="${value}"`;
        try {
          execSync(cmd, { stdio: "inherit" });
          logger.info(`[ENV-MNGR]: SUCCESSFULLY SET ${key}`);
        } catch (error) {
          logger.error(`[ENV-MNGR]: FAILED TO SET ${key}:`, error);
        }
      }
    } catch (error) {
      logger.error("[ENV-MNGR]: ERROR SETTING FIREBASE ENVIRONMENT:", error);
    }
  }

  removeFirebaseEnv(vars) {
    try {
      for (const key of vars) {
        const cmd = `firebase functions:config:unset ${key}`;
        try {
          execSync(cmd, { stdio: "inherit" });
          logger.info(`[ENV-MNGR]: SUCCESSFULLY REMOVED ${key}`);
        } catch (error) {
          logger.error(`[ENV-MNGR]: FAILED TO REMOVE ${key}:`, error);
        }
      }
    } catch (error) {
      logger.error("[ENV-MNGR]: ERROR SETTING FIREBASE ENVIRONMENT:", error);
    }
  }

  setEnvironment() {
    try {
      const localEnvVars = {};
      const newEnvVars = {};
      const currentEnvVars = this.getCurrentFirebaseEnv();
      const envsToRemove = [];

      for (const [key, value] of Object.entries(this.env)) {
        if (ENV_VARS_LIST[key] && value) {
          localEnvVars[ENV_VARS_LIST[key]] = value;
        }
      }

      for (const [key, value] of Object.entries(currentEnvVars)) {
        const allowedKeys = Object.values(ENV_VARS_LIST);
        for (const keyToCheck of Object.keys(value)) {
          if (!allowedKeys.includes(`${key}.${keyToCheck}`)) {
            envsToRemove.push(`${key}.${keyToCheck}`);
          }
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

      if (envsToRemove.length) this.removeFirebaseEnv(envsToRemove);
      if (Object.keys(newEnvVars).length) this.setFirebaseEnv(newEnvVars);

      if (envsToRemove.length || Object.keys(newEnvVars).length) {
        logger.info("[ENV-MNGR]: FINISHED UPDATING FIREBASE ENVIRONMENT");
      } else {
        logger.info("[ENV-MNGR]: NO NEW VARIABLES DETECTED");
      }
    } catch (error) {
      logger.error("[ENV-MNGR]: ERROR SETTING ENVIRONMENT:", error);
    }
  }
}

export default new EnvironmentManager().setEnvironment();

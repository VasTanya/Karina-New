import log4js from "log4js";
import config from "./Config.js";

log4js.configure(config);
const logger = log4js.getLogger();

export default logger;

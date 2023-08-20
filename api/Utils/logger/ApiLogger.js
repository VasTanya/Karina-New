import logger from "./Logger.js";

const apiLogger = (req, res, next) => {
  const { method, url, params, query, body, headers } = req;
  logger.info(`API - Method: ${method}, URL: ${url}`, {
    params,
    query,
    body,
    headers,
  });
  next();
};

export default apiLogger;

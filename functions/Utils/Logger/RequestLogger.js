import logger from "./Logger.js";

const requestLogger = (req, res, next) => {
  const start = Date.now();
  const { method, url } = req;
  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.mark(
      `API - Method: ${method}, URL: ${url}, DURATION: ${duration}ms`
    );
  });
  next();
};

export default requestLogger;

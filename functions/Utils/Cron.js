import fs from "fs";
import path from "path";
import cron from "cron";
import logger from "./Logger/Logger.js";

const Cron = () => {
  const deleteFiles = () => {
    const directoryPath = "Public/img/mydesign";

    logger.log(`CRON : Deleting files in directory: ${directoryPath}`);

    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        logger.error(`CRON : Error reading directory: ${err}`);
        return;
      }

      const currentTime = Date.now();
      const oneWeekInMillis = 7 * 24 * 60 * 60 * 1000;

      files.forEach((file) => {
        const filePath = path.join(directoryPath, file);

        fs.stat(filePath, (error, stats) => {
          if (error) {
            logger.error(
                `CRON : Error getting file stats ${filePath}: ${error}`,
            );
            return;
          }

          const fileAgeInMillis = currentTime - stats.ctime.getTime();

          if (fileAgeInMillis >= oneWeekInMillis) {
            fs.unlink(filePath, (deleteError) => {
              if (deleteError) {
                logger.error(
                    `CRON : Error deleting file ${filePath}: ${deleteError}`,
                );
              } else {
                logger.log(`CRON : Deleted file: ${filePath}`);
              }
            });
          }
        });
      });
    });
  };

  const CronJob = cron.CronJob;

  const job = new CronJob("0 0 * * *", deleteFiles, null, true, "UTC");

  job.start();
};

export default Cron;

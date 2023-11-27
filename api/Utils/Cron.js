import fs from "fs";
import path from "path";
import cron from "cron";
import logger from "./Logger/Logger.js";

const Cron = () => {
  const deleteFiles = () => {
    const directoryPath = "Public/img/mydesign";

    logger.log(`Deleting files in directory: ${directoryPath}`);

    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        logger.error(`Error reading directory: ${err}`);
        return;
      }

      const currentTime = Date.now();
      const oneWeekInMillis = 7 * 24 * 60 * 60 * 1000;

      files.forEach((file) => {
        console.log("====================================");
        console.log("FOREACH FILE: ", file);
        console.log("====================================");
        const filePath = path.join(directoryPath, file);

        fs.stat(filePath, (error, stats) => {
          if (error) {
            logger.error(`Error getting file stats ${filePath}: ${error}`);
            return;
          }

          const fileAgeInMillis = currentTime - stats.ctime.getTime();

          if (fileAgeInMillis >= oneWeekInMillis) {
            fs.unlink(filePath, (deleteError) => {
              if (deleteError) {
                logger.error(`Error deleting file ${filePath}: ${deleteError}`);
              } else {
                logger.log(`Deleted file: ${filePath}`);
              }
            });
          }
        });
      });
    });
  };

  const CronJob = cron.CronJob;

  const job = new CronJob("* * * * *", deleteFiles, null, true, "UTC");

  job.start();
};

export default Cron;

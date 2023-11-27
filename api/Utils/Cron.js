import fs from "fs";
import path from "path";
import cron from "cron";
import logger from "./Logger/Logger.js";

const Cron = () => {
  const deleteFiles = () => {
    const directoryPath = "Public/img/mydesign";
    const currentDir = new URL(".", import.meta.url).pathname;

    console.log("Current directory:", currentDir);

    logger.log(`Deleting all files in directory: ${directoryPath}`);

    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        logger.error(`Error reading directory: ${err}`);
        return;
      }

      files.forEach((file) => {
        const filePath = path.join(directoryPath, file);

        fs.unlink(filePath, (deleteError) => {
          if (deleteError) {
            logger.error(`Error deleting file ${filePath}: ${deleteError}`);
          } else {
            logger.log(`Deleted file: ${filePath}`);
          }
        });
      });
    });
  };

  const CronJob = cron.CronJob;

  // Run the cron job every minute for testing
  const job = new CronJob("* * * * *", deleteFiles, null, true, "UTC");

  job.start();
};

export default Cron;

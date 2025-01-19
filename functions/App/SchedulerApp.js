import logger from "../Utils/Logger/Logger.js";
import { onSchedule } from "firebase-functions/v2/scheduler";
import { storage } from "../Config/Firebase.js";

const cleanUpCustomDesigns = onSchedule("0 1 * * 1", async (event) => {
  try {
    logger.info("EVENT", event);
    const files = await storage.getFiles({ prefix: "MyDesign/" });
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.setDate() - 7);

    const filesCreated7DaysAgo = files.filter((file) => {
      const fileCreationDate = new Date(file.metadata.timeCreated);
      return (
        fileCreationDate.toDateString() > sevenDaysAgo.toDateString() &&
        file.metadata.name.includes("MyDesign")
      );
    });

    await Promise.all(
      filesCreated7DaysAgo.map(async (file) => {
        await storage.delete(file.metadata.name);
      })
    );
    logger.info(
      `[SCHEDULER cleanUpCustomDesigns]: ${filesCreated7DaysAgo.length} files found`
    );
  } catch (error) {
    logger.error(`[SCHEDULER cleanUpCustomDesigns]: ${error.message}`);
  }
});

export { cleanUpCustomDesigns };

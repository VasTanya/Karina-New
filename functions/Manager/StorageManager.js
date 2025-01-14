import sharp from "sharp";
import logger from "../Utils/Logger/Logger.js";
import { IMAGE_SIZES } from "../Utils/Constants.js";

class StorageManager {
  constructor(storage) {
    this.storage = storage.bucket();
    this.sharp = sharp;
  }

  upload = async (file, src) => {
    try {
      const filePath = this.constructFilePath(file, src);
      const fileRef = this.storage.file(filePath);

      const stream = fileRef.createWriteStream({
        metadata: { contentType: file.mimetype },
      });

      stream.on("error", (error) => {
        logger.error("[STR-MNGR]: Error uploading file:", error);
      });

      stream.on("finish", async () => {
        await fileRef.makePublic();
        logger.log("[STR-MNGR]: File uploaded successfully");
      });

      stream.end(file.buffer);

      return filePath;
    } catch (error) {
      logger.error("[STR-MNGR]: Error uploading file:", error);
    }
  };

  delete = async (url) => {
    try {
      const file = this.storage.file(url);
      const [exists] = await file.exists();
      if (exists) {
        await file.delete();
        logger.log("[STR-MNGR]: File deleted successfully");
      } else {
        logger.log(`[STR-MNGR]: File ${url} doesn't exist`);
      }
    } catch (error) {
      logger.error("[STR-MNGR]: Error deleting file:", error);
    }
  };

  constructFilePath = (file, src) => {
    try {
      const filePathContents = src.split("/");
      const extension = filePathContents[2].split(".")[1] !== "jpeg" && "jpeg";
      const fileName = `${filePathContents[2].split(".")[0]}.${extension}`;
      return `${filePathContents[0]}/${file.size}/${fileName}`;
    } catch (error) {
      logger.error("[STR-MNGR]: Error constructing file path:", error);
    }
  };

  getUrl = async (url) => {
    const file = this.storage.file(url);
    try {
      const expires = Date.now() + 60 * 60 * 1000;
      const [signedUrl] = await file.getSignedUrl({
        action: "read",
        expires,
      });

      return signedUrl;
    } catch (error) {
      logger.error("[STR-MNGR]: Error getting file:", error);
    }
  };

  resizeAndConvert = async (file) => {
    try {
      const resizedImages = [];

      for (const [size, { width, height }] of Object.entries(IMAGE_SIZES)) {
        const buffer = await this.sharp(file.buffer)
          .resize(width, height)
          .toFormat("jpeg")
          .toBuffer();
        const resizedImage = {
          size,
          buffer,
          mimeType: "image/jpeg",
        };

        resizedImages.push(resizedImage);
      }

      return resizedImages;
    } catch (error) {
      logger.error("[STR-MNGR-SHARP]: Error resizing image", error.message);
      throw error;
    }
  };
}

export default StorageManager;

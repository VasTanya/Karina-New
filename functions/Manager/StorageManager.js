import sharp from "sharp";
import logger from "../Utils/Logger/Logger.js";
import { DEFAULT_IMAGE, IMAGE_SIZES } from "../Utils/Constants.js";

class StorageManager {
  constructor(storage) {
    this.storage = storage.bucket();
    this.sharp = sharp;
    this.defaultSize = Object.values(IMAGE_SIZES)[0] || "md";
    this.defaultWidth = IMAGE_SIZES.md.width;
    this.defaultHeight = IMAGE_SIZES.md.height;
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
      let newFilePath;
      const filePathContents = src.split("/");
      const filePathContentsLength = filePathContents.length;
      const hasSubfolder = filePathContentsLength > 2;

      const extension =
        filePathContents[filePathContentsLength - 2].split(".")[1] !== "jpeg" &&
        "jpeg";

      const fileName = `${
        filePathContents[filePathContentsLength - 1].split(".")[0]
      }.${extension}`;

      if (hasSubfolder) {
        newFilePath = `${filePathContents[0]}/${file.size}/${fileName}`;
      } else {
        newFilePath = `${filePathContents[0]}/${fileName}`;
      }

      return newFilePath;
    } catch (error) {
      logger.error("[STR-MNGR]: Error constructing file path:", error);
    }
  };

  getUrl = async (url, isTemporal = false) => {
    const hour = Date.now() + 60 * 60 * 1000;
    const sevenDays = hour + 7 * 24 * 60 * 60 * 1000;
    const file = this.storage.file(url);
    try {
      const [exists] = await file.exists();
      const target = exists ? file : this.storage.file(DEFAULT_IMAGE);

      const [signedUrl] = await target.getSignedUrl({
        action: "read",
        expires: isTemporal ? sevenDays : hour,
      });

      return signedUrl;
    } catch (error) {
      logger.error("[STR-MNGR]: Error getting file:", error);
    }
  };

  getFiles = async () => {
    try {
      const [files] = await this.storage.getFiles();
      return files;
    } catch (error) {
      logger.error("[STR-MNGR]: Error getting files:", error);
    }
  };

  resizeOneAndConvert = async (
    file,
    size = this.defaultSize,
    width = this.defaultWidth,
    height = this.defaultHeight
  ) => {
    try {
      const buffer = await this.sharp(file.buffer)
        .resize(width, height)
        .toFormat("jpeg")
        .toBuffer();
      return {
        size,
        buffer,
        mimeType: "image/jpeg",
      };
    } catch (error) {
      logger.error("[STR-MNGR-SHARP]: Error resizing image", error.message);
      throw error;
    }
  };

  resizeManyAndConvert = async (file) => {
    try {
      const resizedImages = [];

      for (const [size, { width, height }] of Object.entries(IMAGE_SIZES)) {
        const resizedImage = await this.resizeOneAndConvert(
          file,
          size,
          width,
          height
        );

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

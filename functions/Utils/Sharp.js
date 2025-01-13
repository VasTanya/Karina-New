import sharp from "sharp";
import logger from "./Logger/Logger.js";
import { IMAGE_SIZES } from "./Constants.js";

class Sharp {
  constructor() {
    this.sharp = sharp;
  }

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
      logger.error("[SHARP]: Error resizing image", error.message);
      throw error;
    }
  };
}

export default new Sharp();

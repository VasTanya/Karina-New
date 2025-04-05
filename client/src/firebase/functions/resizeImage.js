import imageCompression from "browser-image-compression";
import heic2any from "heic2any";

export const resizeImage = async (file) => {
  if (file.type === "image/heic" || file.type === "image/heif") {
    return await handleIphoneFormat(file);
  }
  return await handleBasicFormat(file);
};

const handleBasicFormat = async (file) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 400,
    useWebWorker: true,
    fileType: "image/jpeg",
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error("Error resizing image:", error);
    throw error;
  }
};

const handleIphoneFormat = async (file) => {
  try {
    const converted = await heic2any({
      blob: file,
      toType: "image/jpeg",
      quality: 0.9,
    });

    return converted;
  } catch (error) {
    console.error("Error converting HEIC/HEIF to JPEG:", error);
    throw error;
  }
};

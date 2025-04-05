import imageCompression from "browser-image-compression";
import heic2any from "heic2any";

export const resizeImage = async (
  file,
  targetWidth = 400,
  targetHeight = 400
) => {
  if (file.type === "image/heic" || file.type === "image/heif") {
    return await handleIphoneFormat(file, targetWidth, targetHeight);
  }
  return await handleBasicFormat(file, targetWidth, targetHeight);
};

const handleBasicFormat = async (file, targetWidth, targetHeight) => {
  try {
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 1,
      useWebWorker: true,
      fileType: "image/jpeg",
    });

    const resized = await resizeViaCanvas(
      compressedFile,
      targetWidth,
      targetHeight
    );
    return resized;
  } catch (error) {
    console.error("Error resizing image:", error);
    throw error;
  }
};

const handleIphoneFormat = async (file, targetWidth, targetHeight) => {
  try {
    const converted = await heic2any({
      blob: file,
      toType: "image/jpeg",
      quality: 0.9,
    });

    const jpegBlob = Array.isArray(converted) ? converted[0] : converted;

    const resized = await resizeViaCanvas(jpegBlob, targetWidth, targetHeight);
    return resized;
  } catch (error) {
    console.error("Error converting HEIC/HEIF to JPEG:", error);
    throw error;
  }
};

const resizeViaCanvas = async (blob, width, height) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (resizedBlob) => {
          URL.revokeObjectURL(url);
          if (resizedBlob) {
            const file = new File([resizedBlob], "resized.jpg", {
              type: "image/jpeg",
            });
            resolve(file);
          } else {
            reject(new Error("Canvas toBlob failed"));
          }
        },
        "image/jpeg",
        0.9
      );
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };

    img.src = url;
  });
};

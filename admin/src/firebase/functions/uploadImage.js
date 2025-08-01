import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";
import { v4 as uuid } from "uuid";
import { resizeImage } from "./resizeImage";

export const IMAGE_SIZES = {
  sm: { width: 96, height: 96 },
  md: { width: 268, height: 326 },
  lg: { width: 384, height: 384 },
};

export const uploadImage = async (location, image) => {
  const content = {};

  for (const size of Object.keys(IMAGE_SIZES)) {
    const { width, height } = IMAGE_SIZES[size];

    const resizedImage = await resizeImage(image, width, height);

    if (resizedImage) {
      const imageRef = ref(storage, `${location}/${size}/${uuid()}.jpeg`);
      const snapshot = await uploadBytes(imageRef, resizedImage);
      content[size] = snapshot.ref.fullPath;
    }
  }

  return content;
};

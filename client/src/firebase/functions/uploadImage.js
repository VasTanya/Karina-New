import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";
import { v4 as uuid } from "uuid";
import { resizeImage } from "./resizeImage";

export const uploadImage = async (location, formData) => {
  const content = {};
  let uploadPath;

  const form = formData;
  const image = form.get("img");
  const resizedImage = await resizeImage(image);

  if (resizedImage) {
    const imageRef = ref(storage, `${location}/${uuid()}.jpeg`);
    const snapshot = await uploadBytes(imageRef, resizedImage);
    uploadPath = snapshot.ref.fullPath;
  }

  form.forEach((value, key) => {
    if (key !== "img") {
      content[key] = value;
    } else if (value === null) {
      content[key] = "";
    } else {
      content[key] = uploadPath;
    }
  });

  return content;
};

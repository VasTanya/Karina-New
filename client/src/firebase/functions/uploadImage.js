import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";
import { v4 as uuid } from "uuid";

export const uploadImage = async (location, formData) => {
  const content = {};
  let uploadPath;

  const form = formData;
  const image = form.get("img");

  if (image) {
    const imageRef = ref(storage, `${location}/${uuid()}`);
    const snapshot = await uploadBytes(imageRef, image);
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

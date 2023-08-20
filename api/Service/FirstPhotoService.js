import FirstPhoto from "../Model/FirstPhoto.js";

class FirstPhotoService {
  constructor() {}

  getAll = async (page, size) => {
    const skip = (page - 1) * size;

    const firstPhoto = await FirstPhoto.find().skip(skip).limit(size);
    return firstPhoto;
  };

  getById = async (id) => {
    const albumById = await FirstPhoto.findById(id);
    return albumById;
  };
}

export default FirstPhotoService;

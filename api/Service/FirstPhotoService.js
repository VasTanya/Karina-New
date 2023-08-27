import FirstPhoto from "../Model/FirstPhoto.js";

class FirstPhotoService {
  constructor() {}

  getAll = async () => {
    const firstPhoto = await FirstPhoto.find()
    return firstPhoto;
  };

  getById = async (id) => {
    const albumById = await FirstPhoto.findById(id);
    return albumById;
  };
}

export default FirstPhotoService;

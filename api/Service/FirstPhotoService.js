import FirstPhoto from "../Model/FirstPhoto.js";

class FirstPhotoService {
  constructor() {}

  getAll = async () => {
    const firstPhoto = await FirstPhoto.find();
    return firstPhoto;
  };

  getById = async (id) => {
    const albumById = await FirstPhoto.findById(id);
    return albumById;
  };

  edit = async (data) => {
    const item = await FirstPhoto.findOneAndUpdate(data);
    return item;
  };
  delete = async (id) => {
    const item = await FirstPhoto.findOneAndDelete(id);
    return item;
  };
}

export default FirstPhotoService;

import Albums from "../Model/AlbumsModel.js";
import logger from "../Utils/logger/logger.js";

class AlbumsService {
  constructor() {}

  getAll = async (page, size) => {
    const skip = (page - 1) * size;

    const albums = await Albums.find().skip(skip).limit(size);
    return albums;
  };

  getById = async (id) => {
    const albumById = await Albums.findById(id);
    return albumById;
  };
}

export default AlbumsService;

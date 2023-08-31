import Albums from "../Model/AlbumsModel.js";
import AlbumData from "../Model/AlbumDataModel.js";

class AlbumsService {
  constructor() {}

  getAll = async (page, size) => {
    const skip = (page - 1) * size;

    const albums = await Albums.find().skip(skip).limit(size);
    return albums;
  };

  getById = async (id, page, size) => {
    const skip = (page - 1) * size;

    const albumDataById = await AlbumData.findOne({ albumId: id }).populate(
      "albumId"
    );

    if (!albumDataById) throw { statusCode: 404, message: "Album not found" };

    const paginatedArray = albumDataById.data.slice(skip, skip + size);

    const paginatedAlbumData = {
      ...albumDataById.toObject(),
      data: paginatedArray,
    };
    return paginatedAlbumData;
  };

  getItemById = async (id, item) => {
    const albumData = await AlbumData.findOne({ albumId: id });

    const albumDataItem = albumData.data.find((el) => el._id == item);

    return albumDataItem;
  };

  edit = async (data) => {
    const item = await Albums.findOneAndUpdate(data);
    return item;
  };

  delete = async (id) => {
    const item = await Albums.findOneAndDelete(id);
    return item;
  };
}

export default AlbumsService;

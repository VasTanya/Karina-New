import Albums from "../Model/AlbumsModel.js";
import AlbumData from "../Model/AlbumDataModel.js";

class AlbumsService {
  constructor() {}

  getAll = async () => {
    const albums = await Albums.find();

    const sortedAlbums = albums.sort((a, b) => a.album_number - b.album_number);

    return sortedAlbums;
  };

  firstPhoto = async () => {
    const albumData = await AlbumData.find().populate("albumId");

    const firstPhotos = albumData.map((item) => {
      const data = {
        album: item.albumId,
        firstPhoto: item.data.find((el) => el.tag === "firstPhoto"),
      };

      return data;
    });

    const sortedFirstPhoto = firstPhotos.sort(
      (a, b) => a.album.album_number - b.album.album_number
    );

    return sortedFirstPhoto;
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
      data: paginatedArray.sort((a, b) => a.display_number - b.display_number),
    };

    return paginatedAlbumData;
  };

  getItemById = async (id, item) => {
    const albumData = await AlbumData.findOne({ albumId: id });
    console.log(albumData);

    const albumDataItem = albumData.data.find((el) => el._id.equals(item));

    return albumDataItem;
  };

  search = async (albumNumber, displayNumber) => {
    const albums = await AlbumData.find().populate("albumId");

    if (!displayNumber) {
      const result = albums.filter(
        (query) => String(query.albumId.album_number) === albumNumber
      );

      if (result.length === 0) {
        return `No result for album number ${albumNumber}`;
      }

      return result;
    } else {
      const matchingAlbums = albums.filter(
        (query) => String(query.albumId.album_number) === albumNumber
      );

      const result = [];

      matchingAlbums.forEach((album) => {
        const matchingData = album.data.find(
          (data) => String(data.display_number) === displayNumber
        );

        if (matchingData) {
          result.push({
            album_number: album.albumId.album_number,
            matching_data: matchingData,
          });
        }
      });

      if (result.length === 0) {
        return `No result for album number ${albumNumber} and display number ${displayNumber}`;
      }

      return result;
    }
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

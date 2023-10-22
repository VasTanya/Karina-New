import bcrypt from "bcryptjs";
import generateToken from "../Utils/Token.js";
import Albums from "../Model/AlbumsModel.js";
import AlbumData from "../Model/AlbumDataModel.js";
import Slices from "../Model/SlicesModel.js";
import Regular from "../Model/RegularModel.js";
import Admin from "../Model/AdminModel.js";
import data from "../data.js";
import logger from "../Utils/Logger/Logger.js";

class AdminService {
  constructor() {}

  login = async (email, password) => {
    const admin = await Admin.findOne({ email: email });
    if (admin) {
      if (bcrypt.compareSync(password, admin.password)) {
        const token = generateToken(admin);
        console.log("SERV: ", token);
        return { token: token, message: "Login successful" };
      }
    }

    return { message: "Wrong email or password" };
  };

  seed = async () => {
    await Albums.deleteMany({});
    await AlbumData.deleteMany({});
    await Slices.deleteMany({});
    await Regular.deleteMany({});

    const createdAlbums = await Albums.insertMany(data.albums);

    const albumDataToInsert = data.albums.map((album) => ({
      albumId: createdAlbums.find(
        (createdAlbum) => createdAlbum.title === album.title
      )._id,
      data: album.album,
      count: album.album.length,
    }));

    const createdAlbumData = await AlbumData.insertMany(albumDataToInsert);

    createdAlbums.forEach(async (album) => {
      const correspondingAlbumData = createdAlbumData.find((albumData) =>
        albumData.albumId.equals(album._id)
      );
      if (correspondingAlbumData) {
        album.albumDataId = correspondingAlbumData._id;
        await album.save();
      }
    });

    const createdSlices = await Slices.insertMany(data.slices);
    const createdRegular = await Regular.insertMany(data.regular);

    return {
      createdAlbums,
      createdAlbumData,
      createdSlices,
      createdRegular,
    };
  };

  seedAdmin = async () => {
    await Admin.deleteMany({});

    const hashedPassword = await bcrypt.hash(data.admin.password, 10);

    const createdAdmin = new Admin({
      login: data.admin.login,
      email: data.admin.email,
      password: hashedPassword,
    });

    await createdAdmin.save();

    return createdAdmin;
  };

  logout = async (req, res) => {
    await res.clearCookie("access_token");

    if (req.cookies.access_token) return { message: "Logout successful" };
  };
}

export default AdminService;

import bcrypt from "bcryptjs";
import { v4 as uuid4 } from "uuid";
import DbService from "./DbService.js";
import logger from "../Utils/Logger/Logger.js";
import generateToken from "../Utils/Token.js";
import data from "../data.js";

class AdminService {
  constructor() {
    this.Albums = new DbService("albums");
    this.AlbumData = new DbService("albumData");
    this.Slices = new DbService("slices");
    this.Regular = new DbService("regular");
    this.Admin = new DbService("admin");
  }

  login = async (email, password) => {
    const admin = await this.Admin.findOne({ email: email });

    if (admin) {
      if (bcrypt.compareSync(password, admin.password)) {
        const token = generateToken(admin);
        return { token: token, message: "Login successful" };
      }
    }

    return { message: "Wrong email or password" };
  };

  seed = async () => {
    try {
      await Promise.all([
        this.Albums.deleteCollection(),
        this.AlbumData.deleteCollection(),
        this.Slices.deleteCollection(),
        this.Regular.deleteCollection(),
      ]);
      logger.info("[ADM-SRV]: COLLECTIONS DELETED");
    } catch (error) {
      logger.error("[ADM-SRV]: COLLECTION DELETION ERROR", error);
    }

    try {
      await Promise.all([
        this.Slices.createCollection(data.slices),
        this.Regular.createCollection(data.regular),
        this.Albums.createCollection(data.albums),
      ]);
      logger.info("[ADM-SRV]: COLLECTIONS CREATED");
    } catch (error) {
      logger.error("[ADM-SRV]: COLLECTION CREATION ERROR", error);
    }

    const createdAlbums = await this.Albums.findAlbums();

    const albumDataToInsert = data.albums.map((album) => {
      const correspondingAlbum = createdAlbums.find(
          (createdAlbum) => createdAlbum.album_number === album.album_number,
      );
      if (!correspondingAlbum) {
        logger.error(
            `[ADM-SRV]: No matching album found for title: ${album.title}`,
        );
        return;
      }

      return {
        albumId: correspondingAlbum._id,
        data: album.album.map((item) => ({
          _id: uuid4(),
          ...item,
        })),
        count: album.album.length,
      };
    });

    try {
      await this.AlbumData.createCollection(albumDataToInsert);
      logger.info("[ADM-SRV]: ALBUM ITEMS CREATED");
    } catch (error) {
      logger.error("[ADM-SRV]: ALBUM ITEM CREATION ERROR", error);
    }

    // createdAlbums.forEach(async (album) => {
    //   const correspondingAlbumData = createdAlbumData.find((albumData) =>
    //     albumData.albumId.equals(album._id)
    //   );
    //   if (correspondingAlbumData) {
    //     album.albumDataId = correspondingAlbumData._id;
    //     await album.save();
    //   }
    // });

    return { message: "Seed successful" };
  };

  seedAdmin = async () => {
    await this.Admin.deleteCollection();

    const hashedPassword = await bcrypt.hash(data.admin.password, 10);

    await this.Admin.createCollection([
      {
        login: data.admin.login,
        email: data.admin.email,
        password: hashedPassword,
      },
    ]);

    return { message: "Admin seeded successfully" };
  };

  logout = async (req, res) => {
    if (req.cookies.access_token) {
      await res.clearCookie("access_token");
      return { message: "Logout successful" };
    } else {
      return { message: "Already logged out" };
    }
  };
}

export default AdminService;

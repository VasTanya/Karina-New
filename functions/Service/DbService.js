import { db } from "../Config/Firebase.js";
import logger from "../Utils/Logger/Logger.js";

class DbService {
  constructor(collectionName) {
    this.collectionName = collectionName;
    this.collection = db.collection(this.collectionName);
    // this.storage = storage;
    // this.bucket = bucket;
  }

  find = async (page = 1, size = 20) => {
    const orderingField =
      this.collectionName === "albums" ? "album_number" : "display_number";

    let query = this.collection;

    if (page && query) {
      query = query
          .orderBy(orderingField)
          .startAt(page * size - size + 1)
          .limit(size);
    } else {
      query = query.orderBy(orderingField);
    }

    const snapshot = await query.get();

    return snapshot.docs.map((doc) => this.mapDoc(doc));
  };

  findAll = async () => {
    const snapshot = await this.collection.get();

    return snapshot.docs.map((doc) => this.mapDoc(doc));
  };

  findOne = async (query) => {
    const [key, value] = Object.entries(query)[0];

    const snapshot = await this.collection
        .where(key, "==", value)
        .limit(1)
        .get();

    return snapshot.docs.map((doc) => this.mapDoc(doc))[0];
  };

  findMany = async (query) => {
    const [key, value] = Object.entries(query)[0];

    const snapshot = await this.collection.where(key, "==", value).get();

    return snapshot.docs.map((doc) => this.mapDoc(doc));
  };

  findAlbums = async (page) => {
    const snapshot = await this.collection.get();

    return snapshot.docs.map((doc) => this.mapDoc(doc));
  };

  findById = async (id) => {
    const docRef = await this.collection.doc(id).get();

    if (!docRef.exists) {
      logger.error(`${this.collectionName} not found`);
      return {};
    }

    return this.mapDoc(docRef);
  };

  findByIdAndUpdate = async (id, data) => {
    const filteredData = Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value !== undefined),
    );

    const docRef = this.collection.doc(id);
    await docRef.update(filteredData);

    return this.mapDoc(await docRef.get());
  };

  count = async () => {
    return (await this.collection.get()).size;
  };

  create = async (data) => {
    await this.collection.add(data);
  };

  findByIdAndDelete = async (id) => {
    await this.collection.doc(id).delete();
  };

  listCollections = async () => {
    return db.listCollections();
  };

  createCollection = async (data) => {
    let count = 0;
    const batch = db.batch();

    data.forEach((doc) => {
      const hasAlbum = Object.keys(doc).includes("album");

      if (hasAlbum) {
        const { album, ...rest } = doc;
        doc = rest;
      }

      const docRef = this.collection.doc();
      batch.set(docRef, doc);
      count++;
    });

    await batch.commit();
    logger.info(
        `${this.collectionName} created successfully: Document count ${count}`,
    );
  };

  deleteCollection = async () => {
    const collectionRef = await this.collection.get();
    const docsLength = collectionRef.size;

    if (!docsLength) {
      logger.info(
          `No documents found in ${this.collectionName} collection to delete`,
      );
      return;
    }

    const batch = db.batch();

    collectionRef.forEach((doc) => batch.delete(doc.ref));

    await batch.commit();
    logger.info(
        `${this.collectionName} deleted successfully: Document count ${docsLength}`,
    );
  };

  mapDoc(doc) {
    const _id = doc.id;
    const data = doc.data();

    return { _id, ...data };
  }

  uploadImage = async (file) => {
    // if (!file) {
    //   logger.warn("No file to upload");
    // }
    // const metadata = {
    //   metadata: { firebaseStorageDownloadTokens: file.name },
    //   contentType: file.mimetype,
    //   cacheControl: "public, max-age=31536000",
    // };
    // const blob = this.bucket.file(file.originalname);
    // const blobStream = blob.createWriteStream({
    //   metadata: metadata,
    //   gzip: true,
    // });
    // blobStream.on("error", (err) => {
    //   logger.error(`Error uploading file: ${err}`);
    // });
    // blobStream.on("finish", () => {
    //   const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}?alt=media&token=${file.name}`;
    //   logger.info(`File uploaded to ${publicUrl}`);
    //   return publicUrl;
    // });
    // blobStream.end(file.buffer);
  };
}

export default DbService;

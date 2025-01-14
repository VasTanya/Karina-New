import { db, storage } from "../Config/Firebase.js";
import logger from "../Utils/Logger/Logger.js";

class DbService {
  constructor(collectionName) {
    this.collectionName = collectionName;
    this.collection = db.collection(this.collectionName);
    this.storage = storage;
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

    const docs = await Promise.all(
      snapshot.docs.map(async (doc) => await this.mapDoc(doc))
    );

    return docs;
  };

  findAll = async () => {
    const snapshot = await this.collection.get();

    const docs = await Promise.all(
      snapshot.docs.map(async (doc) => await this.mapDoc(doc))
    );

    return docs;
  };

  findOne = async (query, getUrl = true) => {
    try {
      const [key, value] = Object.entries(query)[0];

      const snapshot = await this.collection
        .where(key, "==", value)
        .limit(1)
        .get();

      const docs = await Promise.all(
        snapshot.docs.map(async (doc) => await this.mapDoc(doc, getUrl))
      );

      return docs[0];
    } catch (error) {
      logger.error(`Error during findOne: ${error}`);
    }
  };

  findMany = async (query) => {
    const [key, value] = Object.entries(query)[0];

    const snapshot = await this.collection.where(key, "==", value).get();

    const docs = await Promise.all(
      snapshot.docs.map(async (doc) => await this.mapDoc(doc))
    );

    return docs;
  };

  findAlbums = async (page) => {
    const snapshot = await this.collection.get();

    return Promise.all(snapshot.docs.map((doc) => this.mapDoc(doc, false)));
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
    if (data.file) {
      const uploadedFilePaths = await this.uploadImage(data.file, data.src);
      data.src = uploadedFilePaths;
    }

    const filteredData = Object.fromEntries(
      Object.entries(data).filter(
        ([key, value]) => value !== undefined && key !== "file"
      )
    );

    const docRef = this.collection.doc(id);
    await docRef.update(filteredData);

    return this.mapDoc(await docRef.get(), false);
  };

  count = async () => {
    return (await this.collection.get()).size;
  };

  create = async (data) => {
    const docRef = await this.collection.add(data);
    return { _id: docRef.id, ...data };
  };

  update = async (id, data) => {
    await this.collection.doc(id).update(data);
  };

  findByIdAndDelete = async (id) => {
    const docRef = this.collection.doc(id);
    const docData = (await docRef.get()).data();
    const tasks = [docRef.delete()];

    if (docData.src) {
      tasks.push(this.deleteImage(docData.src));
    }

    await Promise.all(tasks);
  };

  findOneAndDelete = async (query) => {
    const [key, value] = Object.entries(query)[0];
    const snapshot = await this.collection
      .where(key, "==", value)
      .limit(1)
      .get();

    if (snapshot.empty) return { message: "Not found" };

    const doc = snapshot.docs[0];
    const docData = doc.data();

    if (docData.data) {
      let batch = [];
      const batchSize = 10;
      let count = docData.data.length;
      for (const item of docData.data) {
        batch.push(this.deleteImage(item.src));
        if (batch.length === batchSize || count < batchSize) {
          await Promise.all(batch);
          batch = [];
          count = count - batch.length;
        }
      }
    }

    const docRef = doc.ref;
    await docRef.delete();
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
      `[DB-SRV]: ${this.collectionName} created successfully: Document count ${count}`
    );
  };

  deleteCollection = async () => {
    const collectionRef = await this.collection.get();
    const docsLength = collectionRef.size;

    if (!docsLength) {
      logger.info(
        `[DB-SRV]: No documents found in ${this.collectionName} collection to delete`
      );
      return;
    }

    const batch = db.batch();

    collectionRef.forEach((doc) => batch.delete(doc.ref));

    await batch.commit();
    logger.info(
      `[DB-SRV]: ${this.collectionName} deleted successfully: Document count ${docsLength}`
    );
  };

  mapDoc = async (doc, getUrl = true) => {
    const _id = doc.id;
    const data = doc.data();

    if (getUrl) {
      if (data.src && Object.keys(data.src).length) {
        const mappedUrls = await this.mapUrls(data.src);
        data.src = mappedUrls;
      } else if (data.data) {
        for (const item of data.data) {
          if (item.src) {
            const mappedUrls = await this.mapUrls(item.src);
            item.src = mappedUrls;
          }
        }
      }
    }

    return { _id, ...data };
  };

  mapUrls = async (urls) => {
    const mappedUrls = {};

    for (const [key, value] of Object.entries(urls)) {
      const path = await this.storage.getUrl(value);
      mappedUrls[key] = path;
    }

    return mappedUrls;
  };

  uploadImage = async (file, src) => {
    const resizedImages = await this.storage.resizeAndConvert(file);

    const filePaths = {};
    for (const file of resizedImages) {
      const filePath = await this.storage.upload(file, src);
      Object.assign(filePaths, { [file.size]: filePath });
    }

    return filePaths;
  };

  deleteImage = async (src) => {
    for (const key of Object.keys(src)) {
      await this.storage.delete(src[key]);
    }
  };
}

export default DbService;

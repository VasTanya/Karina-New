import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

class StorageManager {
  constructor(app) {
    this.storage = getStorage(app);
  }
}

export default StorageManager;

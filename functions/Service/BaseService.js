import DbService from "./DbService.js";

export class BaseService extends DbService {
  constructor(serviceName) {
    super(serviceName);
    this.dataTitle = this.setDataTitle(serviceName);
  }

  getAll = async () => {
    return this.find();
  };

  getById = async (id) => {
    return this.findById(id);
  };

  edit = async (data) => {
    const updatedData = await this.findByIdAndUpdate(data._id, data);

    if (!updatedData) {
      throw new Error(`${this.dataTitle} not found`);
    }

    return updatedData;
  };

  add = async (data) => {
    const dataLength = await this.count();

    if (data.file) {
      const uploadedFilePaths = await this.uploadImage(data.file, data.src);
      data.src = uploadedFilePaths;
    } else {
      data.src = {
        sm: "noPhoto (sm).jpeg",
        md: "noPhoto (md).jpeg",
        lg: "noPhoto (lg).jpeg",
      };
    }

    await this.create({
      display_number: dataLength + 1,
      title: data.title,
      price: data.price,
      src: data.src,
    });

    return { message: `${this.dataTitle} created` };
  };

  delete = async (id) => {
    const item = await this.findByIdAndDelete(id);

    if (!item) {
      return {
        status: 404,
        message: "Item not found",
      };
    }

    return item;
  };

  setDataTitle = (collectionName) => {
    if (!collectionName) return "";

    const singularName = collectionName.endsWith("s")
      ? collectionName.slice(0, -1)
      : collectionName;

    return (
      singularName.charAt(0).toUpperCase() + singularName.slice(1).toLowerCase()
    );
  };
}

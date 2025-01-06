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

    await this.create({
      display_number: dataLength + 1,
      title: data.title,
      price: data.price,
      src: data.src,
    });

    return { message: `${this.dataTitle} created` };
  };

  delete = async (id, src) => {
    const item = await this.findByIdAndDelete(id);

    if (!item) {
      return {
        status: 404,
        message: "Item not found",
      };
    }

    // const path = join(
    //   dirname(new URL(import.meta.url).pathname, "..", "Public", src),
    //   "..",
    //   "Public",
    //   src
    // );

    // try {
    //   unlinkSync(path);
    // } catch (error) {
    //   console.error("Error deleting image:", error);
    // }

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

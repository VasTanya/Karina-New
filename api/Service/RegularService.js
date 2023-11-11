import { unlinkSync } from "fs";
import { join, dirname } from "path";
import Regular from "../Model/RegularModel.js";

class RegularService {
  constructor() {}

  getAll = async () => {
    const regular = await Regular.find();

    const sortedRegular = regular.sort(
      (a, b) => a.display_number - b.display_number
    );
    return sortedRegular;
  };

  getById = async (id) => {
    const regularById = await Regular.findById(id);
    return regularById;
  };

  edit = async (data) => {
    const updatedItem = await Regular.findByIdAndUpdate(data._id, data);

    if (!updatedItem) {
      throw new Error("Regular not found");
    }

    return updatedItem;
  };

  add = async (data) => {
    const regular = await Regular.find();

    await Regular.create({
      display_number: regular.length + 1,
      title: data.title,
      price: data.price,
      src: data.src,
    });

    return { message: `Slice created` };
  };

  delete = async (id, src) => {
    const item = await Regular.findByIdAndDelete(id);

    if (!item) {
      return {
        status: 404,
        message: "Item not found",
      };
    }

    const path = join(
      dirname(new URL(import.meta.url).pathname, "..", "Public", src),
      "..",
      "Public",
      src
    );

    try {
      unlinkSync(path);
    } catch (error) {
      console.error("Error deleting image:", error);
    }

    return item;
  };
}

export default RegularService;

import { unlinkSync } from "fs";
import { join, dirname } from "path";
import Slices from "../Model/SlicesModel.js";

class SlicesService {
  constructor() {}

  getAll = async () => {
    const slices = await Slices.find();

    const sortedSlices = slices.sort(
      (a, b) => a.display_number - b.display_number
    );
    return sortedSlices;
  };

  getById = async (id) => {
    const sliceById = await Slices.findById(id);
    return sliceById;
  };

  edit = async (data) => {
    const updatedSlice = await Slices.findByIdAndUpdate(data._id, data);

    if (!updatedSlice) {
      throw new Error("Slice not found");
    }

    return updatedSlice;
  };

  add = async (data) => {
    const slice = await Slices.find();

    await Slices.create({
      display_number: slice.length + 1,
      title: data.title,
      price: data.price,
      src: data.src,
    });

    return { message: `Slice created` };
  };

  delete = async (id, src) => {
    const item = await Slices.findByIdAndDelete(id);

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

export default SlicesService;

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
    const updatedItem = await Slices.findByIdAndUpdate(data._id, data);

    if (!updatedItem) {
      throw new Error("Slice not found");
    }

    return updatedItem;
  };

  delete = async (id) => {
    const item = await Slices.findByIdAndDelete(id);

    return item;
  };
}

export default SlicesService;

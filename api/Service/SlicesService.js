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
    const item = await Slices.findOneAndUpdate(data);
    return item;
  };
  delete = async (id) => {
    const item = await Slices.findOneAndDelete(id);
    return item;
  };
}

export default SlicesService;

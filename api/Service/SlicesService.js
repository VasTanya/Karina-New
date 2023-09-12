import Slices from "../Model/SlicesModel.js";

class SlicesService {
  constructor() {}

  getAll = async () => {
    // const skip = (page - 1) * size;

    const slices = await Slices.find()
    // .find().skip(skip).limit(size);
    return slices;
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

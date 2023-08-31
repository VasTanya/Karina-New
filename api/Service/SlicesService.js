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
}

export default SlicesService;

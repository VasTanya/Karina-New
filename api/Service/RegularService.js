import Regular from "../Model/RegularModel.js";

class RegularService {
  constructor() {}

  getAll = async () => {
    // const skip = (page - 1) * size;

    const regular = await Regular.find()
    // .find().skip(skip).limit(size);
    return regular;
  };

  getById = async (id) => {
    const regularById = await Regular.findById(id);
    return regularById;
  };
}

export default RegularService;

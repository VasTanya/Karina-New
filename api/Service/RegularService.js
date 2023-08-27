import Regular from "../Model/RegularModel.js";

class RegularService {
  constructor() {}

  getAll = async () => {
    const regular = await Regular.find();
    return regular;
  };

  getById = async (id) => {
    const regularById = await Regular.findById(id);
    return regularById;
  };
}

export default RegularService;

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
    const item = await Regular.findOneAndUpdate(data);
    return item;
  };
  delete = async (id) => {
    const item = await Regular.findOneAndDelete(id);
    return item;
  };
}

export default RegularService;

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
    console.log(data);
    const updatedItem = await Regular.findByIdAndUpdate(data._id, data);

    if (!updatedItem) {
      throw new Error("Regular not found");
    }

    return updatedItem;
  };

  delete = async (id) => {
    const item = await Regular.findByIdAndDelete(id);

    return item;
  };
}

export default RegularService;

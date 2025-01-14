import SlicesService from "../Service/SlicesService.js";
import { BaseController } from "./BaseController.js";

class SlicesController extends BaseController {
  constructor() {
    super(new SlicesService(), "SLC");
  }
}

export default new SlicesController();

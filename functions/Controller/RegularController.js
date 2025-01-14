import RegularService from "../Service/RegularService.js";
import { BaseController } from "./BaseController.js";

class RegularController extends BaseController {
  constructor() {
    super(new RegularService(), "RGL");
  }
}

export default new RegularController();

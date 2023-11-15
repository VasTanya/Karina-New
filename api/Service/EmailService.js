import mailer from "../Utils/Mailer.js";

class EmailService {
  constructor() {}

  sendRequest = async (data) => {
    const message = await mailer("request", data);
    return message;
  };

  sendRequestMyDesign = async (data) => {
    console.log("====================================");
    console.log("SERVICE DATA: ", data);
    console.log("====================================");
    const message = await mailer("order", data);
    return message;
  };
}

export default EmailService;

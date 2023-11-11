import mailer from "../Utils/Mailer.js";

class EmailService {
  constructor() {}

  sendRequest = async (data) => {
    console.log("====================================");
    console.log(data);
    console.log("====================================");
    const message = await mailer("request", data);
    return message;
  };

  sendRequestYourDesign = async (data) => {
    const message = await mailer("order", data);
    return message;
  };
}

export default EmailService;

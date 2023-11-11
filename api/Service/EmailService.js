import mailer from "../Utils/Mailer.js";

class EmailService {
  constructor() {}

  sendRequest = async (data) => {
    console.log("====================================");
    console.log("SERVICE: ", data);
    console.log("====================================");
    const message = await mailer(data);
    return message;
  };
}

export default EmailService;

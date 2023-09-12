import mailer from "../Utils/Mailer.js";

class EmailService {
  constructor() {}

  sendRequest = async (data) => {
    console.log("SERVICE EMAIL: ", data.email);
    await mailer(data);
    return true;
  };
}

export default EmailService;

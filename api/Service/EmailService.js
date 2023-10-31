import mailer from "../Utils/Mailer.js";

class EmailService {
  constructor() {}

  sendRequest = async (data) => {
    const message = await mailer(data);
    return message;
  };
}

export default EmailService;

import mailer from "../Utils/Mailer.js";

class EmailService {
  constructor() {}

  sendRequest = async (data) => {
    await mailer(data);
    return true;
  };
}

export default EmailService;

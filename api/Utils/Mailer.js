import nodemailer from "nodemailer";
import logger from "../Utils/Logger/Logger.js";

const mailer = async (data) => {
  const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT),
    secure: process.env.MAIL_ENCRYPTION === "tls",
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
    logger: true,
  });

  // Define email content
  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: process.env.MAIL_TO,
    subject: `New Request For ${data.cakeCode}`,
    html: emailHtml(data),
  };

  try {
    await transporter.sendMail(mailOptions);
    return { message: `Request for ${data.cakeCode} has been sent!` };
  } catch (error) {
    logger.error(error);
    return {
      message: `Request for ${data.cakeCode} has failed! Try again later!`,
    };
  }
};

const emailHtml = (data) => {
  return `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 3vw;
            background-color: #f4f4f4;
          }
          .container {
            width: 43vw;
            margin: 0 auto;
            background-color: #fff;
            padding: 1.5vw 2vw;
            border-radius: 5px;
            box-shadow: 0px 2px 22px 2px rgba(182, 151, 90, 0.82);
          }
          h1 {
            color: #333;
            font-size: 2.2vw;
          }
          p {
            color: #555;
            font-size: 1.2vw;
          }
          img {
            width: 70px;
            height: 70px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <p><center><img src="https://api.karinas515.com${data.img}"></center></p>
          <h1>New Request For ${data.cakeCode}</h1>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Size:</strong> ${data.size}</p>
          <p><strong>Filling:</strong> ${data.filling}</p>
        </div>
      </body>
    </html>
  `;
};

export default mailer;

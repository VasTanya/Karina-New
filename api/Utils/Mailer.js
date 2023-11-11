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
    logger: true, // Enable the default console logger
  });

  // Define email content
  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: process.env.MAIL_TO,
    subject: `New Request For ${data.cakeCode}`,
    html: emailHtml(data),
  };

  console.log("====================================");
  console.log("MAIL_MAILER: ", process.env.MAIL_MAILER);
  console.log("MAIL_SERVICE: ", process.env.MAIL_SERVICE);
  console.log("MAIL_HOST: ", process.env.MAIL_HOST);
  console.log("MAIL_PORT: ", process.env.MAIL_PORT);
  console.log("MAIL_USERNAME: ", process.env.MAIL_USERNAME);
  console.log("MAIL_PASSWORD: ", process.env.MAIL_PASSWORD);
  console.log("MAIL_ENCRYPTION: ", process.env.MAIL_ENCRYPTION);
  console.log("MAIL_TO: ", process.env.MAIL_TO);
  console.log("mailOptions: ", mailOptions);
  console.log("====================================");

  try {
    await transporter.sendMail(mailOptions);
    logger.info("Email has been sent"); // transporter status
    return { message: "Email has been sent" };
  } catch (error) {
    logger.error(error);
    return { message: `Error sending email: ${error.message}` };
  }
};

const emailHtml = (data) => {
  return `
    <html>
      <head>
        <style>
          // Your CSS styles here
        </style>
      </head>
      <body>
        <div class="container">
          <p><center><img src="${data.img}"></center></p>
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

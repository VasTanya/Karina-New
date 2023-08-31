import nodemailer from "nodemailer";
import logger from "./Logger/Logger.js";

const mailer = async (data) => {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.MAIL,
      pass: process.env.MAIL_PASS, // Replace with your actual password
    },
  });

  const mailOptions = {
    from: data.email,
    to: process.env.MAIL,
    subject: `New Request For ${data.cakeCode}`,
    html: emailHtml(data),
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info("Email has been sent");
  } catch (error) {
    logger.error(`MAILER Error sending email: ${error}`);
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
      </style>
    </head>
    <body>
      <div class="container">
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

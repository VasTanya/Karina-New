import nodemailer from "nodemailer";

const mailer = async (data) => {
  // Create a transporter using the provided email configuration
  const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT),
    secure: process.env.MAIL_ENCRYPTION === "tls",
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
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
    return { message: "Email has been sent" };
  } catch (error) {
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
          <p><center><img src=${data.img}></center></p>
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

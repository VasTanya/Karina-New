import util from "util";
import child_process from "child_process";

const mailer = async (data) => {
  const emailContent = `
    Subject: New Request For ${data.cakeCode}
    To: ${process.env.MAIL_USERNAME}
    
    ${emailHtml(data)}
  `;

  const sendmail = util.promisify(child_process.exec);
  try {
    await sendmail(
      `echo "${emailContent}" | sendmail ${process.env.MAIL_USERNAME}`
    );
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

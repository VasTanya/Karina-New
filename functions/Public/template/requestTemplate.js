export const requestTemplate = (data) => {
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
            width: 30vw;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <p><center><img src="https://www.karinas515.com${data.img.replace(
    / /g,
    "%20"
  )}"></center></p>
          <h1>New Request For ${data.cakeCode}</h1>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Size:</strong> ${data.size}</p>
          <p><strong>Filling:</strong> ${data.filling}</p>
          <p><strong>Pick_up_date:</strong> ${data.pick_up_date}</p>
          <p><strong>Pick_up_location:</strong> ${data.pick_up_location}</p>
          <p><strong>Comment:</strong> ${data.comment}</p>
        </div>
      </body>
    </html>
  `;
};

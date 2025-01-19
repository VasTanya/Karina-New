const devOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:4000",
];

const allowedOrigins = [
  ...(process.env.NODE_ENV === "development" ? devOrigins : []),
  "https://199.36.158.100",
  "https://karinas515.com",
  "https://www.karinas515.com",
  "https://admin.karinas515.com",
];

export default allowedOrigins;

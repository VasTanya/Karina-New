import allowedOrigins from "./AllowedOrigins.js";

const corsOptions = {
  origin: allowedOrigins,
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
  credentials: true,
};

export default corsOptions;

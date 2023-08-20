const config = {
  appenders: {
    console: { type: "console" },
    // file: { type: "file", filename: "logs/app.log" },
  },
  categories: {
    default: { appenders: ["console"], level: "info" }, // "file"
  },
};

export default config;

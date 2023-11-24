import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("====================================");
    console.log("MULTER REQ: ", req);
    console.log("MULTER FILE: ", file);
    console.log("====================================");
    cb(null, `Public/img/${req.body.src.split("/")[2]}`);
  },
  filename: (req, file, cb) => {
    cb(null, req.body.src.split("/")[3]);
  },
});

const fileFilter = (req, file, cb) => {
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: Infinity }, // Set the file size limit to Infinity
});

export default upload;

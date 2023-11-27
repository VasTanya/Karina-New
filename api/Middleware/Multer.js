import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      req.body.src
        ? `Public/img/${req.body.src.split("/")[2]}`
        : "Public/img/mydesign"
    );
  },
  filename: (req, file, cb) => {
    cb(null, req.body.src ? req.body.src.split("/")[3] : file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: Infinity },
});

export default upload;

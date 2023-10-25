import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req.body.src.split("/"));
    cb(null, `Public/img/${req.body.src.split("/")[2]}`);
  },
  filename: (req, file, cb) => {
    cb(null, req.body.src.split("/")[3]);
  },
});

const fileFilter = (req, file, cb) => {
  cb(null, true); // Accept all files
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default upload;

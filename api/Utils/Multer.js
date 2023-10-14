// multer.js
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `Public/img/${req.body.src.split("/")[2]}`);
  },
  filename: (req, file, cb) => {
    cb(null, req.body.src.split("/")[3]);
  },
});

const upload = multer({ storage: storage });

export default upload;

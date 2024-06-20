import multer from "multer";
import { Request } from "express";

const storage = multer.diskStorage({
  filename: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

export default upload;

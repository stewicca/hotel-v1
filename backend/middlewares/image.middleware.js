import multer from "multer";
import path from "path";

const storageUser = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/user");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const storageRoomType = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/roomtype");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

export const uploadUser = multer({ storage: storageUser });
export const uploadRoomType = multer({ storage: storageRoomType });

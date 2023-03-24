const multer = require("multer");
const path = require("path");

// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);  
    if (ext !== ".mp4" && ext !== ".mkv" &&   ext !== ".mp3"  && ext !== ".jpeg" && ext !== ".jpg" && ext !== ".png" && ext !== ".gif" && ext !== ".pdf" && ext !== ".docx" && ext !== ".doc" && ext !== ".mp3" && ext !== ".mp4" && ext !== ".mkv" && ext !== ".avi" && ext !== ".mov" && ext !== ".wmv" && ext !== ".flv" && ext !== ".3gp" && ext !== ".webm" && ext !== ".ogg" && ext !== ".wav" && ext !== ".m4a" && ext !== ".m4v" && ext !== ".m4b" && ext !== ".m4r" && ext !== ".m4p" && ext !== ".m4u" && ext !== ".m4b" && ext !== ".m4v" && ext !== ".m4r" && ext !== ".m4p" && ext !== ".m4u" && ext !== ".m4b" && ext !== ".m4v" && ext !== ".m4r" && ext !== ".m4p" && ext !== ".m4u" && ext !== ".m4b" && ext !== ".m4v" && ext !== ".m4r" && ext !== ".m4p" && ext !== ".m4u" && ext !== ".m4b" && ext !== ".m4v" && ext !== ".m4r" && ext !== ".m4p" && ext !== ".m4u" && ext !== ".m4b" && ext !== ".m4v" && ext !== ".m4r" && ext !== ".m4p" && ext !== ".m4u" && ext !== ".m4b" && ext !== ".m4v" && ext !== ".m4r" && ext !== ".m4p" && ext !== ".m4u" && ext !== ".m4b" && ext !== ".m4v" && ext !== ".m4r" && ext !== ".m4p" && ext !== ".m4u" && ext !== ".m4b" && ext !== ".m4v" && ext !== ".m4r" && ext !== ".m4p" && ext !== ".m4u" && ext !== ".m4b" && ext !== ".m4v" && ext !== ".m4r" && ext !== ".m4p" && ext !== ".m4u" && ext !== ".m4b" && ext !== ".m4v" && ext !== ".MPEG" && ext !== ".mpeg"     ) {
      //&& ext !== ".jpeg" && ext !== ".png"
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
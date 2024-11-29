const multer = require("multer");
const path = require("path");

/**
 * Config local file storage
 */
const storage = multer.diskStorage({
  //
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "../public/uploads"));
  },

  // setup fileName
  filename: (req, file, callback) => {
    const uniqueSuffix =
      Date.now() +
      Math.round(Math.random() * 10) +
      path.extname(file.originalname);
    callback(null, "attachment-" + uniqueSuffix);
  },
});

module.exports = storage;

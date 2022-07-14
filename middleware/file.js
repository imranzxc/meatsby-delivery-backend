const multer = require('multer');
const storage = multer.diskStorage({
  destination(req, file, cd) {
    cd(null, 'images');
  },
  filename(req, file, cd) {
    cd(null, file.originalname);
  },
});

const types = ['image/png', 'image/jpeg', 'image/jpg'];
const fileFilter = (req, file, cb) => {
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({ storage, fileFilter });

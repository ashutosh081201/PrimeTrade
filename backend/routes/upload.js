const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'backend/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

// @route   POST api/upload
// @desc    Upload an image
// @access  Private
router.post('/', upload.single('profileImage'), (req, res) => {
  res.send(`/${req.file.path}`);
});

module.exports = router;

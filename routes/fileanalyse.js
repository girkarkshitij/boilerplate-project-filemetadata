const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: './uploads',
});

const upload = multer({
  storage: storage,
}).single('upfile');

router.post('/', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(500).send('Server error');
    } else {
      if (req.file === undefined) {
        res.status(404).send('No file selected');
      } else {
        res.json({
          name: req.file.originalname,
          type: req.file.mimetype,
          size: req.file.size,
        });
      }
    }
  });
});

module.exports = router;

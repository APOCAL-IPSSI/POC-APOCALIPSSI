const express = require('express');
const router = express.Router();
const multer = require('multer');
const { processDocument } = require('../controllers/documentController');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

router.post('/upload', upload.single('pdf'), processDocument);

module.exports = router;
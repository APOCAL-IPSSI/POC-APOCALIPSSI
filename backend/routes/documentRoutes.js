const express = require('express');
const router = express.Router();
const multer = require('multer');
const { processDocument, processRawText, getAllDocuments, deleteDocument } = require('../controllers/documentController');


const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

router.post('/upload', upload.single('pdf'), processDocument);

router.post('/text', processRawText);

router.get('/history', getAllDocuments);

router.delete('/history/:id', deleteDocument);

module.exports = router;
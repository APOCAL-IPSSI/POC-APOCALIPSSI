const express = require('express');
const router = express.Router();
const multer = require('multer');
const { processDocument, processRawText, getAllDocuments, deleteDocument } = require('../controllers/documentController');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload et résume un document PDF
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               pdf:
 *                 type: string
 *                 format: binary
 *               charLimit:
 *                 type: integer
 *                 description: Limite du nombre de caractères dans le résumé (optionnel)
 *     responses:
 *       200:
 *         description: Résumé généré
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 summary:
 *                   type: string
 *       400:
 *         description: Erreur liée à la requête
 *       500:
 *         description: Erreur serveur
 */
router.post('/upload', upload.single('pdf'), processDocument);

router.post('/text', processRawText);

router.get('/history', getAllDocuments);

router.delete('/history/:id', deleteDocument);

module.exports = router;
/**
 * @swagger
 * /text:
 *   post:
 *     summary: Résume un texte brut
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: Texte à résumer
 *               charLimit:
 *                 type: integer
 *                 description: Limite du nombre de caractères dans le résumé (optionnel)
 *     responses:
 *       200:
 *         description: Résumé généré
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 summary:
 *                   type: string
 *       400:
 *         description: Erreur liée à la requête
 *       500:
 *         description: Erreur serveur
 */
router.post('/text', processRawText);

module.exports = router;

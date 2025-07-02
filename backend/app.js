const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const documentRoutes = require('./routes/documentRoutes');
const path = require('path');

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/docs', documentRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('🟢 MongoDB connecté'))
  .catch(err => console.error('🔴 Erreur MongoDB', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend lancé sur http://0.0.0.0:${PORT}`);
});

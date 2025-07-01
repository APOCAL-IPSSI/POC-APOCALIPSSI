const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const documentRoutes = require('./routes/documentRoutes');
const path = require('path');
const cors = require('cors');

dotenv.config();
const app = express();

// Add CORS middleware BEFORE routes
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());
app.use('/api/docs', documentRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('🟢 MongoDB connecté'))
  .catch(err => console.error('🔴 Erreur MongoDB', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Backend lancé sur http://localhost:${PORT}`));
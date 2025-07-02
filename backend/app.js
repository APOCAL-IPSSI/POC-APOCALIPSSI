const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const documentRoutes = require('./routes/documentRoutes');
const path = require('path');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use('/api/docs', documentRoutes);

const uploadsPath = path.join(__dirname, 'uploads');
const fs = require('fs');
if (!fs.existsSync(uploadsPath)){
  fs.mkdirSync(uploadsPath, { recursive: true });
}
app.use('/uploads', express.static(uploadsPath));

// Swagger UI route
app.use('/api/docs/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('🟢 MongoDB connecté'))
  .catch(err => console.error('🔴 Erreur MongoDB', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend lancé sur http://0.0.0.0:${PORT}`);
});
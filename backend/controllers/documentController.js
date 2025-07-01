const axios = require('axios');
const { extractTextFromPDF } = require('../utils/pdfUtils');

exports.processDocument = async (req, res) => {
  try {
    const pdfText = await extractTextFromPDF(req.file.path);
    const prompt = `
Tu es un assistant juridique. Résume ce document PDF de manière structurée :
1. Résumé général
2. Points clés
3. Suggestions d’actions

Voici le contenu :
${pdfText}
`;

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-7b-instruct',
        messages: [
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const summary = response.data.choices[0].message.content;
    res.json({ summary });

  } catch (error) {
    console.error('Erreur de traitement:', error.response?.data || error.message);
    res.status(500).json({ error: 'Erreur de traitement du document' });
  }
};

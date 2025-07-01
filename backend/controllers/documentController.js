const axios = require('axios');
const { extractTextFromPDF } = require('../utils/pdfUtils');

exports.processDocument = async (req, res) => {
  try {
    const charLimit = parseInt(req.body.charLimit, 10) || 1000; // Limite par défaut : 1000

    const pdfText = await extractTextFromPDF(req.file.path);

    const prompt = `
Tu es un assistant juridique. Résume ce document PDF de manière structurée :
1. Résumé général
2. Points clés
3. Suggestions d’actions

⚠️ La réponse doit faire maximum ${charLimit} caracteres, quitte à résumer drastiquement s'il le faut.

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

    const summary = response.data.choices?.[0]?.message?.content;
    res.json({ summary });

  } catch (error) {
    console.error('Erreur de traitement:', error.message);
    res.status(500).json({ error: error.message || 'Erreur de traitement du document' });
  }
};



exports.processRawText = async (req, res) => {
  try {
    const rawText = req.body.text;
    const charLimit = parseInt(req.body.charLimit, 10) || 1000;

    if (!rawText || rawText.trim() === '') {
      return res.status(400).json({ error: 'Aucun texte fourni.' });
    }

    const prompt = `
Tu es un assistant juridique. Résume ce texte de manière structurée :
1. Résumé général
2. Points clés
3. Suggestions d’actions

⚠️ La réponse doit faire maximum ${charLimit} caractères, quitte à résumer drastiquement s'il le faut.

Voici le texte :
${rawText}
`;

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-7b-instruct',
        messages: [
          {
            role: 'system',
            content: 'Tu es un assistant juridique compétent, clair et structuré',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'Text Summarizer'
        }
      }
    );

    const summary = response.data.choices?.[0]?.message?.content;
    res.json({ summary });

  } catch (error) {
    const errMsg = error.response?.data || error.message;
    console.error('Erreur de traitement (texte brut):', errMsg);
    res.status(500).json({ error: errMsg });
  }
};

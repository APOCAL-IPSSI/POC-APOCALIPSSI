const fs = require('fs');
const pdfParse = require('pdf-parse');

exports.extractTextFromPDF = async (filePath) => {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);

    const totalPages = data.numpages;

    if (totalPages > 10) {
        throw new Error(`Le PDF contient ${totalPages} pages. Limite autorisée : 10 pages.`);
    }

    return data.text;
};

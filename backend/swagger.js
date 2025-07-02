const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Résumeur Juridique',
            version: '1.0.0',
            description: 'API pour résumer des documents PDF ou du texte brut',
        },
        servers: [
            {
                url: 'https://poc-apocalipssi-production.up.railway.app/api/docs',
            },
        ],
    },
    apis: ['./routes/documentRoutes.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

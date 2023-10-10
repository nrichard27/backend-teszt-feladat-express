import { Express } from 'express';
import SwaggerJSDoc from 'swagger-jsdoc';
import SwaggerUI from 'swagger-ui-express';
import { version } from '../package.json';

const options: SwaggerJSDoc.Options = {
    failOnErrors: true,
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Backend Teszt Feladat Express API',
            version,
        },
    },
    apis: [
        './src/controllers/*.controller.ts',
        './src/schemas/*.schema.ts',
        './src/dto/*.dto.ts',
        './src/router.ts',
    ],
};

const openapi_spec = SwaggerJSDoc(options);

export function swagger_docs(app: Express) {
    app.use('/docs', SwaggerUI.serve, SwaggerUI.setup(openapi_spec));

    app.get('/docs.json', (req, res) => {
        res.json(openapi_spec);
    });

    console.log(`Docs available at /docs`);
    console.log(`OpenAPI v3 specification available at /docs.json`);
}

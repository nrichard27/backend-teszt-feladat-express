import express, { Request, Response } from 'express';
import cors from 'cors';
import routes from './router';
import helmet from 'helmet';
import { connect_to_database } from './config/db.config';
import { create_test_user } from './config/test-user.config';
import { swagger_docs } from './swagger';
import { exception_filter } from './middlewares/exception.filter';
import { error_handler } from './middlewares/error.handler';

// Connect to database
connect_to_database();

// Add test user with admin role
create_test_user();

const app = express();

// Express configuration
app.use(express.json());
app.use(helmet());
app.use(
    cors({
        origin: process.env.API_WEBSITE_URL || '*',
        optionsSuccessStatus: 200,
    }),
);
app.disable('x-powered-by');

// Start Swagger Docs (only in development mode)
if (process.env.NODE_ENV != 'production') {
    swagger_docs(app);
}

// App routes
app.use('/api/v1', routes, exception_filter, error_handler);

// 404 routes
app.all('*', (req: Request, res: Response) => {
    res.status(404).json({
        code: 404,
        message: 'Not found',
    });
});

// Start listening for connections
app.listen(process.env.API_PORT || 3000, () => {
    console.log(
        `API listening on port ${process.env.API_PORT || 3000} at /api`,
    );
});

import express from 'express';
import path from 'path';
import cors from 'cors';

import 'express-async-errors';
import './database/conection';

import routes from './routes';
import errorHandler from './errors/handler'

// Create a new express app instance
console.log('[EXPRESS] creating a new server');
const app = express();
app.use(cors());
app.use(express.json());

// Use all imported routes
app.use(routes);

// Use upload folder to save images on diskStorage
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));


app.use(errorHandler);
app.listen(3333, () => console.log('Web server listening on port 3333'));
console.log(process.env.JSON_WEB_TOKEN_SECRET);

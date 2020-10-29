import { Router } from 'express';

// Routes
import auth from './auth';
import orphanages from './orphanages';

const routes = Router();

routes.use('/auth', auth);
routes.use('/orphanages', orphanages);

export default routes;

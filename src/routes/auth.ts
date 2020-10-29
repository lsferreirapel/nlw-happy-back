import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { checkJwt } from '../middleware/checkJwt';

const routes = Router();

// Login Route
routes.post('/login', AuthController.login);

// Change my password
routes.post('/change-password', [checkJwt], AuthController.changePassword);

export default routes;

import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import OrphanagesController from '../controllers/OrphanagesController'

const routes = Router();
const upload = multer(uploadConfig);

// Get all orphanages 
routes.get('/', OrphanagesController.index);

// Get one orphanage 
routes.get('/:id', OrphanagesController.show);

// Create a new orphanage
routes.post('/', upload.array('images'), OrphanagesController.create);

export default routes;

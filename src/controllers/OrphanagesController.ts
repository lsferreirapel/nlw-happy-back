import {Request, Response} from 'express';
import { getRepository } from 'typeorm';
import orphanageView from '../views/orphanages_view';
import * as Yup from 'yup';

import Orphanage from '../models/Orphanage';
import { number } from 'yup';
import Image from '../models/Image';
import { validate } from 'class-validator';

export default {
  async index(request: Request, response: Response) {
    // Get Orphanages from database
    const orphanagesRepository = getRepository(Orphanage);
    const orphanages = await orphanagesRepository.find({
      relations: ['images']
    });

    // Send the orphanages object to view
    return response.json(orphanageView.renderMany(orphanages));
  },
  
  async show(request: Request, response: Response) {
    // Get the ID from the URL
    const id: number = Number(request.params.id);

    // Get the user from database, If fails send a error and 404 status
    const orphanagesRepository = getRepository(Orphanage);
    let orphanage: Orphanage;
    try {
      orphanage = await orphanagesRepository.findOneOrFail(id, {
        relations: ['images']
      });  
    } catch (error) {
      response.status(404).send('User not found');
      return;
    }
    
    // Send the User object to View
    return response.json(orphanageView.render(orphanage));
  },
  
  async create(request: Request, response: Response) {
    // Get params from body
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body;
    
    // Get images from request body
    const requestImages = request.files as Express.Multer.File[];

    // Create a array of Image
    const images: Image[] = requestImages.map(img => {
        let image = new Image();
        image.path = img.filename;
        return image;
    })

    // Create a new instance of Orphanage
    let orphanage = new Orphanage();
    orphanage.name = name;
    orphanage.latitude = latitude;
    orphanage.longitude = longitude;
    orphanage.about = about;
    orphanage.instructions = instructions;
    orphanage.opening_hours = opening_hours;
    orphanage.open_on_weekends = open_on_weekends === 'true';
    orphanage.images = images;

    // Validade if the parameters are ok
    const errors = await validate(orphanage, { validationError: { target: false } });
    if (errors.length > 0) {
      response.status(400).send(errors);
      return;
    } 

    // Create and save a new Orphanage table
    try {
      const orphanagesRepository = getRepository(Orphanage);
      const createdOrphanage = orphanagesRepository.create(orphanage);
      await orphanagesRepository.save(createdOrphanage);
    } catch (error) {
      response.status(400).send(error)
    }
    
  
    // If all ok, send 201 response
    response.status(201).send(orphanage);
  }
}

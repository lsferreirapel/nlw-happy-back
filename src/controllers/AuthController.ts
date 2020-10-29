import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as jwt from 'jsonwebtoken';

import User from '../models/User';

import config from '../config/config';
import { validate } from 'class-validator';

class AuthController{
  static login = async (request: Request, response: Response) => {
    // Check if username and password are set 
    const { email, password } = request.body;
    if (!(email && password)) {
      response.status(400).json({message:'Bad Request'});
      return;
    }

    // Get User from database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { email }});
    } catch (error) {
      response.status(404).json({message:'User not found'});
      return;
    }


    // Check if unencrypted password match, if not send a error
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      response.status(401).json({message:'Wrong password'});
    }

    // Sign JWT, valid for 1 hour
    const token = jwt.sign(
      { UserID: user.id, email: user.email},
      config.jwtSecret,
      { expiresIn: '1h' }
    );

    response.status(200).send(token);
  }

  static changePassword = async (request: Request, response: Response) => {
    // Get ID from JWT
    const id = response.locals.jwtPayload.userID;

    // Get params from body and validate
    const { oldPassword, newPassword} = request.body;
    if (!(oldPassword && newPassword)) {
      response.status(400).json({message:'Bad Request'});
      return;
    }

    // Try get the user from the database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      response.status(404).json({message:'User not found'});
      return;
    }

    // Validate the new password
    user.password = newPassword;
    const errors = await validate(user, { validationError: { target: false } });
    if (errors.length > 0) {
      response.status(400).send(errors);
    }

    // Hash new password and save
    user.hashPassword();
    userRepository.save(user);

    // After all send a 204 (no content, but accepted) response
    response.status(204).send();
  }
} 

export default AuthController;

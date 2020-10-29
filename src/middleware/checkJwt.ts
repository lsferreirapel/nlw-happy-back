import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import config from '../config/config';

export const checkJwt = (request: Request, response: Response, next: NextFunction) => {
  // Get the JWT from head
  const token = <string>request.headers["auth"];

  let jwtPayload;
  // Try validate the token and get the database
  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    response.locals.jwtPayload = jwtPayload;
  } catch (error) {
    // IF token is invalid, respond with 401 (unauthorized)
    response.status(401).send('Invalid token');
  }

  // Token is valid for 1 hour
  // Send a new token on every request
  const { userID, email } = jwtPayload;
  const newToken = jwt.sign(
    { userID, email},
    config.jwtSecret,
    { expiresIn: '1h' }
  );
  response.setHeader('token', newToken);

  // Call the next middleware or controller
  next();
}

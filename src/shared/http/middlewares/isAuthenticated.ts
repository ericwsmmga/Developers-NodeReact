import { AppError } from '@shared/errors/appError';
import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import auth from '@config/auth';

export default function isAuthenticated(
   request: Request,
   response: Response,
   next: NextFunction,
): void {
   const austHeader = request.headers.authorization;
   if (!austHeader) {
      throw new AppError('JWT Token in missing.');
   }
   const [, token] = austHeader.split(' ');
   try {
      const decodeToken = verify(token, auth.jwt.secret);

      return next();
   } catch (error) {
      throw new AppError('Invalid JWT Token.');
   }
}

export { isAuthenticated };

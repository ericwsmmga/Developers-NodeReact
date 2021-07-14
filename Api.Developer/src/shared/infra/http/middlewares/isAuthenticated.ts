import { AppError } from '@shared/errors/appError';
import { Secret, verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { NextFunction, Request, Response } from 'express';
import { LogErrorsControllers } from '@modules/logs/errors/infra/http/controllers/LogErrorsController';

interface ITokenPayload {
   iat: number;
   exp: number;
   sub: string;
}

function isAuthenticated(
   request: Request,
   response: Response,
   next: NextFunction,
): void {
   const authHeader = request.headers.authorization;

   if (!authHeader) {
      throw new AppError('JWT token is missing.');
   }

   const [, token] = authHeader.split(' ');

   try {
      const decodeToken = verify(token, authConfig.jwt.secret as Secret);

      const { sub } = decodeToken as ITokenPayload;

      request.developer = {
         id: sub,
      };

      return next();
   } catch (error) {
      const message = (error as Error).message;
      const stack = (error as Error).stack;
      const errorLocation = 'isAuthenticated';
      const statusCode = 500;

      const logErrorsController = new LogErrorsControllers();
      logErrorsController.create({ message, stack, errorLocation, statusCode });

      throw new AppError('Invalid JWT Token.');
   }
}

export { isAuthenticated };

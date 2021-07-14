import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { errors } from 'celebrate';
import { pagination } from 'typeorm-pagination';
import cors from 'cors';
import { routes } from './routes';
import { AppError } from '../../errors/appError';
import '@shared/infra/typeorm';
import '@shared/container';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from '../../../swagger.json';
import { LogErrorsControllers } from '@modules/logs/errors/infra/http/controllers/LogErrorsController';

const app = express();

app.use(cors());

app.use(express.json());

app.use(pagination);

app.use(routes);

app.use(errors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(
   (error: Error, request: Request, response: Response, next: NextFunction) => {
      if (error instanceof AppError) {
         return response.status(error.statusCode).json({
            status: 'error',
            message: error.message,
         });
      }

      const message = error.message;
      const stack = error.stack;
      const errorLocation = 'server';
      const statusCode = 500;

      const logErrorsController = new LogErrorsControllers();
      logErrorsController.create({ message, stack, errorLocation, statusCode });

      return response.status(statusCode).json({
         status: 'error',
         message: error.message,
      });
   },
);

app.listen(process.env.APP_PORT, () => {
   console.log('Server started on port ' + process.env.APP_PORT + '!');
});

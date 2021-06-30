import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { SessionsController } from '../controllers/SessionsController';
const sessionsRouter = Router();

const sessionsController = new SessionsController();

sessionsRouter.post(
   '/',
   celebrate({
      [Segments.BODY]: {
         email: Joi.string().required(),
         password: Joi.string().required(),
      },
   }),
   sessionsController.create,
);

export { sessionsRouter };

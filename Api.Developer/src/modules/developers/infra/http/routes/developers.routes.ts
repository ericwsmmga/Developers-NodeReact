import { Router } from 'express';
import { DevelopersControllers } from '../controllers/DevelopersController';
import { celebrate, Joi, Segments } from 'celebrate';

const developersRouter = Router();
const developersController = new DevelopersControllers();

developersRouter.get('/', function (req, res) {
   developersController.index(req, res);
});

developersRouter.get(
   '/:id',
   celebrate({
      [Segments.PARAMS]: {
         id: Joi.string().uuid().required(),
      },
   }),
   developersController.show,
);

developersRouter.post(
   '/',
   celebrate({
      [Segments.BODY]: {
         name: Joi.string().required(),
         email: Joi.string().email().required(),
         sex: Joi.string().required(),
         hobby: Joi.string().required(),
         birthDate: Joi.date().required(),
      },
   }),
   developersController.create,
);

developersRouter.put(
   '/:id',
   celebrate({
      [Segments.BODY]: {
         name: Joi.string(),
         email: Joi.string().email(),
         sex: Joi.string(),
         hobby: Joi.string(),
         birthDate: Joi.date(),
      },
      [Segments.PARAMS]: {
         id: Joi.string().uuid().required(),
      },
   }),
   developersController.update,
);

developersRouter.delete(
   '/:id',
   celebrate({
      [Segments.PARAMS]: {
         id: Joi.string().uuid().required(),
      },
   }),
   developersController.delete,
);

export { developersRouter };

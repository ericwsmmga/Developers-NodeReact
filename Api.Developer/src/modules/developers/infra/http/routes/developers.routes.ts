import { Router } from 'express';
import { DevelopersControllers } from '../controllers/DevelopersController';
import { celebrate, Joi, Segments } from 'celebrate';
import { isAuthenticated } from '../../../../../shared/infra/http/middlewares/isAuthenticated';

const developersRouter = Router();
const developersController = new DevelopersControllers();

developersRouter.get('/', isAuthenticated, function (req, res) {
   developersController.index(req, res);
});

developersRouter.get(
   '/:id',
   isAuthenticated,
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
         password: Joi.string().required(),
         sex: Joi.string().required(),
         hobby: Joi.string().required(),
         birthDate: Joi.date().required(),
      },
   }),
   developersController.create,
);

developersRouter.put(
   '/:id',
   isAuthenticated,
   celebrate({
      [Segments.BODY]: {
         name: Joi.string().required(),
         email: Joi.string().email().required(),
         password: Joi.string().required(),
         sex: Joi.string().required(),
         hobby: Joi.string().required(),
         birthDate: Joi.date().required(),
      },
      [Segments.PARAMS]: {
         id: Joi.string().uuid().required(),
      },
   }),
   developersController.update,
);

developersRouter.delete(
   '/:id',
   isAuthenticated,
   celebrate({
      [Segments.PARAMS]: {
         id: Joi.string().uuid().required(),
      },
   }),
   developersController.delete,
);

export { developersRouter };

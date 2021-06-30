import { isAuthenticated } from '@shared/http/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { UsersControllers } from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersControllers();

usersRouter.get('/', isAuthenticated, usersController.index);

usersRouter.get('/paginate', isAuthenticated, usersController.showPaginate);
usersRouter.get(
   '/:id',
   celebrate({
      [Segments.PARAMS]: {
         id: Joi.string().uuid().required(),
      },
   }),
   usersController.show,
);

usersRouter.post(
   '/',
   celebrate({
      [Segments.BODY]: {
         name: Joi.string().required(),
         admin: Joi.boolean().required(),
         email: Joi.string().required(),
         password: Joi.string().required(),
         sex: Joi.string().required(),
         hobby: Joi.string().required(),
         birth_date: Joi.date().required(),
         technology_id: Joi.string().uuid().required(),
      },
   }),
   usersController.create,
);

usersRouter.put(
   '/:id',
   isAuthenticated,
   celebrate({
      [Segments.BODY]: {
         name: Joi.string().required(),
         admin: Joi.boolean().required(),
         email: Joi.string().required(),
         password: Joi.string().required(),
         sex: Joi.string().required(),
         hobby: Joi.string().required(),
         birth_date: Joi.date().required(),
         technology_id: Joi.string().uuid().required(),
      },
      [Segments.PARAMS]: {
         id: Joi.string().uuid().required(),
      },
   }),
   usersController.update,
);

usersRouter.delete(
   '/:id',
   isAuthenticated,
   celebrate({
      [Segments.PARAMS]: {
         id: Joi.string().uuid().required(),
      },
   }),
   usersController.delete,
);

export { usersRouter };

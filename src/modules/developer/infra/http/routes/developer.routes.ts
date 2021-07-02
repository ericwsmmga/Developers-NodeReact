import { Router } from 'express';
import { isAuthenticated } from '@shared/infra/http/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { DeveloperController } from '@modules/developer/infra/http/controllers/DeveloperController';

const developerRouter = Router();
const developerController = new DeveloperController();

developerRouter.get('/', developerController.index);

developerRouter.get('/paginate', developerController.showPaginate);

developerRouter.get(
   '/:id',
   celebrate({
      [Segments.PARAMS]: {
         id: Joi.string().uuid().required(),
      },
   }),
   developerController.show,
);
developerRouter.post(
   '/',
   celebrate({
      [Segments.BODY]: {
         name: Joi.string().required(),
         email: Joi.string().required(),
         password: Joi.string().required(),
         sex: Joi.string().required(),
         hobby: Joi.string().required(),
         birth_date: Joi.date().required(),
      },
   }),
   developerController.create,
);

developerRouter.put(
   '/:id',
   isAuthenticated,
   celebrate({
      [Segments.BODY]: {
         name: Joi.string().required(),
         email: Joi.string().required(),
         password: Joi.string().required(),
         sex: Joi.string().required(),
         hobby: Joi.string().required(),
         birth_date: Joi.date().required(),
      },
      [Segments.PARAMS]: {
         id: Joi.string().uuid().required(),
      },
   }),
   developerController.update,
);

developerRouter.delete(
   '/:id',
   isAuthenticated,
   celebrate({
      [Segments.PARAMS]: {
         id: Joi.string().uuid().required(),
      },
   }),
   developerController.delete,
);

export { developerRouter };

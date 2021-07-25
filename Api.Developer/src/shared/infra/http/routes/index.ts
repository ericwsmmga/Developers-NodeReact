import { Router } from 'express';
import { developersRouter } from '../../../../modules/developers/infra/http/routes/developers.routes';

const routes = Router();

routes.use('/developers', developersRouter);

export { routes };

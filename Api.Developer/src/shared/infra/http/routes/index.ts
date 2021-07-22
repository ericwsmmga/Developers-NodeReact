import { developersRouter } from '@modules/developers/infra/http/routes/developers.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/developers', developersRouter);

export { routes };

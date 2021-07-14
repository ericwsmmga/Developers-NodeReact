import { sessionsRouter } from '@modules/developers/infra/http/routes/sessions.routes';
import { developersRouter } from '@modules/developers/infra/http/routes/developers.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/developers', developersRouter);

routes.use('/sessions', sessionsRouter);

export { routes };

import { Router } from 'express';
import { sessionsRouter } from '@modules/developer/infra/http/routes/sessions.routes';
import { developerRouter } from '@modules/developer/infra/http/routes/developer.routes';

const routes = Router();

routes.use('/developers', developerRouter);
routes.use('/sessions', sessionsRouter);

export { routes };

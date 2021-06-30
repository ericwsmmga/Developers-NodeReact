import { sessionsRouter } from '@modules/users/routes/sessions.routes';
import { usersRouter } from '@modules/users/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export { routes };

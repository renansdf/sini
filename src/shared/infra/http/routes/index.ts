import { Router } from 'express';
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionRoutes from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionRoutes);

export default routes;
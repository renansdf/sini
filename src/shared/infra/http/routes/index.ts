import 'reflect-metadata';
import { Router } from 'express';
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionRoutes from '@modules/users/infra/http/routes/sessions.routes';
import passportRoutes from '@modules/passports/infra/http/routes/passport.routes'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const routes = Router();
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionRoutes);
routes.use('/passports', ensureAuthenticated, passportRoutes);

export default routes;
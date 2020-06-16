import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { container } from 'tsyringe';

const sessionRoutes = Router();

sessionRoutes.post('/', async (request, response) => {
  const { email, master_password } = request.body;

  const createSession = container.resolve(AuthenticateUserService);

  const { user, token } = await createSession.execute({ email, master_password });

  delete user.master_password;

  return response.json({ user, token });
});

export default sessionRoutes;
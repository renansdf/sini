import { Router } from 'express';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionRoutes = Router();

sessionRoutes.post('/', async (request, response) => {
  const { email, master_password } = request.body;

  const usersRepository = new UsersRepository();
  const createSession = new AuthenticateUserService(usersRepository);

  const { user, token } = await createSession.execute({ email, master_password });

  delete user.master_password;

  return response.json({ user, token });
});

export default sessionRoutes;
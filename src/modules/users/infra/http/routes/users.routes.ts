import { Router } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();

usersRoutes.post('/', async (request, response) => {
  const { name, email, master_password } = request.body;

  const usersRepository = new UsersRepository();
  const createUserService = new CreateUserService(usersRepository);

  const user = await createUserService.create({ name, email, master_password });

  delete user.master_password;

  return response.json(user);
});

usersRoutes.get('/', ensureAuthenticated, async (request, response) => {
  const { email } = request.body;

  const usersRepository = new UsersRepository();
  const user = await usersRepository.findByEmail(email);

  return response.json(user);
});

export default usersRoutes;
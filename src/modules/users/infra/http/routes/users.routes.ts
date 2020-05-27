import { Router } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const usersRoutes = Router();

usersRoutes.post('/', async (request, response) => {
  const { email, master_password } = request.body;

  console.log(email);

  const usersRepository = new UsersRepository();
  const createUserService = new CreateUserService(usersRepository);

  const user = await createUserService.create({ email, master_password });

  delete user.master_password;

  return response.json(user);
});

export default usersRoutes;
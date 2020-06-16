import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/schemas/User';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async create({ name, email, master_password }: ICreateUserDTO): Promise<User> {
    const checkIfUserExists = await this.usersRepository.findByEmail(email);

    if (checkIfUserExists) {
      throw new AppError('User already exists');
    }

    const encryptedPassword = await hash(master_password, 8);
    const user = await this.usersRepository.create({ name, email, master_password: encryptedPassword });
    return user;
  }
}

export default CreateUserService;
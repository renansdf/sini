import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';

class CreateUserService {
  constructor(private usersRepository: IUsersRepository) { }

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
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import authConfig from '@config/authConfig';
import { sign } from 'jsonwebtoken';

interface IRequest {
  email: string;
  master_password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class AuthenticateUserService {

  constructor(private userRepository: IUsersRepository) { }

  public async execute({ email, master_password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Dados incorretos ou inválidos', 401);
    }

    const passwordIsCorrect = await compare(master_password, user.master_password);

    if (!passwordIsCorrect) {
      throw new AppError('Dados incorretos ou inválidos', 402)
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token }
  }
}

export default AuthenticateUserService;
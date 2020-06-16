import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import ICredentialsRepository from '@modules/passports/repositories/IPassportsRepository';
import PassportsRepository from '@modules/passports/infra/typeorm/repositories/PassportsRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
container.registerSingleton<ICredentialsRepository>('PassportsRepository', PassportsRepository);


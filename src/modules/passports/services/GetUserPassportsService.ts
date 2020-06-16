import { inject, injectable } from 'tsyringe';
import IPassportsRepository from '../repositories/IPassportsRepository';
import Passport from '@modules/passports/infra/typeorm/schemas/Passport';

@injectable()
class GetUserPassportsService {
  constructor(
    @inject('PassportsRepository')
    private PassportsRepository: IPassportsRepository,
  ) { }

  public async getUserPassports(userId: string): Promise<Passport[]> {
    const credentials = this.PassportsRepository.index(userId);
    return credentials;
  }
}

export default GetUserPassportsService;
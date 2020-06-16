import { inject, injectable } from 'tsyringe';
import IPassportsRepository from '../repositories/IPassportsRepository';

@injectable()
class CreatePassportService {
  constructor(
    @inject('PassportsRepository')
    private PassportsRepository: IPassportsRepository,
  ) { }

  public async createNewPassport(userId: string, name: string, link: string, login: string, password: string): Promise<void> {
    await this.PassportsRepository.create(userId, name, link, login, password);
  }
}

export default CreatePassportService;
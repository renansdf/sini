import IPassportsRepository from "@modules/passports/repositories/IPassportsRepository";
import Passport from '@modules/passports/infra/typeorm/schemas/Passport';
import { getMongoRepository, MongoRepository } from 'typeorm';

class PassportsRepository implements IPassportsRepository {
  private ormRepository: MongoRepository<Passport>;

  constructor() {
    this.ormRepository = getMongoRepository(Passport);
  }

  public async create(user_id: string, name: string, link: string, login: string, password: string): Promise<void> {
    const credential = this.ormRepository.create({ user_id, name, link, login, password });
    await this.ormRepository.save(credential);
  }

  public async index(user_id: string): Promise<Passport[]> {
    const credentials = await this.ormRepository.find({ where: { user_id } });
    return credentials;
  }

}

export default PassportsRepository;
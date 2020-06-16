import Passport from '../infra/typeorm/schemas/Passport';

export default interface IPassportsRepository {
  create(user_id: string, name: string, link: string, login: string, password: string): Promise<void>;
  index(user_id: string): Promise<Passport[]>;
}
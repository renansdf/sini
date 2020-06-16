import { Router } from 'express';
import { container } from 'tsyringe';
import CreatePassportService from '@modules/passports/services/CreatePassportService';
import GetUserPassportsService from '@modules/passports/services/GetUserPassportsService';

const passportRoutes = Router();

passportRoutes.post('/', async (request, response) => {
  const { name, link, login, password } = request.body;
  const userId = request.user.id;

  const createPassportService = container.resolve(CreatePassportService);

  await createPassportService.createNewPassport(userId, name, link, login, password);

  return response.json({ ok: true });
});

passportRoutes.get('/', async (request, response) => {
  const userId = request.user.id;

  const getUserPassport = container.resolve(GetUserPassportsService);

  const passports = await getUserPassport.getUserPassports(userId);

  return response.json(passports);
});

export default passportRoutes;
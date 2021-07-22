import 'reflect-metadata';
import { FakeDeveloperRepository } from '@modules/developers/domain/repositories/fakes/FakeDeveloperRepository';
import { ListDeveloperService } from '../ListDeveloperService';
import { FakeLogErrorsRepository } from '@modules/logs/errors/domain/repositories/fakes/FakeLogErrorsRepository';

let fakeDeveloperRepository: FakeDeveloperRepository;
let listDeveloper: ListDeveloperService;
let fakeLogErrorsRepository: FakeLogErrorsRepository;

describe('ListDeveloper', () => {
   beforeEach(() => {
      fakeDeveloperRepository = new FakeDeveloperRepository();
      fakeLogErrorsRepository = new FakeLogErrorsRepository();
      listDeveloper = new ListDeveloperService(
         fakeDeveloperRepository,
         fakeLogErrorsRepository,
      );
   });

   it('must be able to return developers', async () => {
      await fakeDeveloperRepository.create({
         name: 'Nome Teste',
         email: 'email@email.com',
         sex: 'M',
         age: 0,
         hobby: 'Hobby teste',
         birthDate: new Date(2000, 1, 2),
      });

      await fakeDeveloperRepository.create({
         name: 'Nome Teste',
         email: 'email1@email.com',
         sex: 'M',
         age: 0,
         hobby: 'Hobby teste',
         birthDate: new Date(2000, 1, 2),
      });

      expect(await listDeveloper.execute()).toHaveProperty('per_page');
   });
});

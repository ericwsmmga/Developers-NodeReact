import 'reflect-metadata';
import { FakeDeveloperRepository } from '@modules/developers/domain/repositories/fakes/FakeDeveloperRepository';
import { FakeHashProvider } from '../../providers/hashprovider/fakes/FakeHashProvider';
import { UpdateDeveloperService } from '../../services/UpdateDeveloperService';
import { AppError } from '@shared/errors/appError';
import { FakeLogErrorsRepository } from '@modules/logs/errors/domain/repositories/fakes/FakeLogErrorsRepository';

let fakeDeveloperRepository: FakeDeveloperRepository;
let updateDeveloper: UpdateDeveloperService;
let fakeHashProvider: FakeHashProvider;
let fakeLogErrorsRepository: FakeLogErrorsRepository;

describe('UpdateDeveloper', () => {
   beforeEach(() => {
      fakeDeveloperRepository = new FakeDeveloperRepository();
      fakeHashProvider = new FakeHashProvider();
      fakeLogErrorsRepository = new FakeLogErrorsRepository();
      updateDeveloper = new UpdateDeveloperService(
         fakeDeveloperRepository,
         fakeHashProvider,
         fakeLogErrorsRepository,
      );
   });

   it('should be able to updated a developer', async () => {
      const developer = await fakeDeveloperRepository.create({
         name: 'Nome Teste',
         email: 'email@email.com',

         sex: 'M',
         age: 0,
         hobby: 'Hobby teste',
         birthDate: new Date(2000, 1, 2),
      });

      const developerUpdated = await updateDeveloper.execute({
         id: developer.id,
         name: 'Nome Teste',
         email: 'email1@email.com',

         sex: 'M',
         hobby: 'Hobby teste',
         birthDate: new Date(2000, 1, 2),
      });

      expect(developerUpdated.email).toEqual('email1@email.com');
   });

   it('should not be able to update non-existent developer', async () => {
      expect(
         updateDeveloper.execute({
            id: '266d4af7-f203-4ba7-b45a-040dc0a68c1f',
            name: 'Nome Teste',
            email: 'email@email.com',
            sex: 'M',
            hobby: 'Hobby teste',
            birthDate: new Date(2000, 1, 2),
         }),
      ).rejects.toBeInstanceOf(AppError);
   });

   it('should not be able to update email as email already exists', async () => {
      await fakeDeveloperRepository.create({
         name: 'Nome Teste',
         email: 'email@email.com',
         sex: 'M',
         age: 0,
         hobby: 'Hobby teste',
         birthDate: new Date(2000, 1, 2),
      });

      const developer = await fakeDeveloperRepository.create({
         name: 'Nome Teste',
         email: 'email1@email.com',
         sex: 'M',
         age: 0,
         hobby: 'Hobby teste',
         birthDate: new Date(2000, 1, 2),
      });

      expect(
         updateDeveloper.execute({
            id: developer.id,
            name: 'Nome Teste',
            email: 'email@email.com',
            sex: 'M',
            hobby: 'Hobby teste',
            birthDate: new Date(2000, 1, 2),
         }),
      ).rejects.toBeInstanceOf(AppError);
   });

   it('should not be able to update developer as gender is invalid', async () => {
      const developer = await fakeDeveloperRepository.create({
         name: 'Nome Teste',
         email: 'email1@email.com',
         sex: 'M',
         age: 0,
         hobby: 'Hobby teste',
         birthDate: new Date(2000, 1, 2),
      });

      expect(
         updateDeveloper.execute({
            id: developer.id,
            name: 'Nome Teste',
            email: 'email@email.com',
            sex: 'A',
            hobby: 'Hobby teste',
            birthDate: new Date(2000, 1, 2),
         }),
      ).rejects.toBeInstanceOf(AppError);
   });
});

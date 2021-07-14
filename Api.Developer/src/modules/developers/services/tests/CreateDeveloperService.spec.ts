import 'reflect-metadata';
import { CreateDeveloperService } from '../../services/CreateDeveloperService';
import { FakeDeveloperRepository } from '@modules/developers/domain/repositories/fakes/FakeDeveloperRepository';
import { AppError } from '@shared/errors/appError';
import { FakeHashProvider } from '../../providers/hashprovider/fakes/FakeHashProvider';
import { FakeLogErrorsRepository } from '@modules/logs/errors/domain/repositories/fakes/FakeLogErrorsRepository';

let fakeDeveloperRepository: FakeDeveloperRepository;
let createDeveloper: CreateDeveloperService;
let fakeHashProvider: FakeHashProvider;
let fakeLogErrorsRepository: FakeLogErrorsRepository;

describe('CreateDeveloper', () => {
   beforeEach(() => {
      fakeDeveloperRepository = new FakeDeveloperRepository();
      fakeHashProvider = new FakeHashProvider();
      fakeLogErrorsRepository = new FakeLogErrorsRepository();
      createDeveloper = new CreateDeveloperService(
         fakeDeveloperRepository,
         fakeHashProvider,
         fakeLogErrorsRepository,
      );
   });

   it('should be able to create a new developer', async () => {
      const developer = await createDeveloper.execute({
         name: 'Nome Teste',
         email: 'email@email.com',
         password: '123456789',
         sex: 'M',
         age: 0,
         hobby: 'Hobby teste',
         birthDate: new Date(2000, 1, 2),
      });

      expect(developer).toHaveProperty('id');
   });

   it('should not be able to create two customers with the same email', async () => {
      await createDeveloper.execute({
         name: 'Nome Teste',
         email: 'email@email.com',
         password: '123456789',
         sex: 'M',
         age: 0,
         hobby: 'Hobby teste',
         birthDate: new Date(2000, 1, 2),
      });
      expect(
         createDeveloper.execute({
            name: 'Nome Teste',
            email: 'email@email.com',
            password: '123456789',
            sex: 'M',
            age: 0,
            hobby: 'Hobby teste',
            birthDate: new Date(2000, 1, 2),
         }),
      ).rejects.toBeInstanceOf(AppError);
   });

   it('should not be able to create two customers with the same email', async () => {
      expect(
         createDeveloper.execute({
            name: 'Nome Teste',
            email: 'email@email.com',
            password: '123456789',
            sex: 'A',
            age: 0,
            hobby: 'Hobby teste',
            birthDate: new Date(2000, 1, 2),
         }),
      ).rejects.toBeInstanceOf(AppError);
   });
});

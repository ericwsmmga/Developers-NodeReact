import 'reflect-metadata';
import { FakeDeveloperRepository } from '@modules/developers/domain/repositories/fakes/FakeDeveloperRepository';
import { AppError } from '@shared/errors/appError';
import { CreateSessionsService } from '../CreateSessionsService';
import { FakeHashProvider } from '@modules/developers/providers/hashprovider/fakes/FakeHashProvider';
import { FakeLogErrorsRepository } from '@modules/logs/errors/domain/repositories/fakes/FakeLogErrorsRepository';

let fakeDeveloperRepository: FakeDeveloperRepository;
let fakeHashProvider: FakeHashProvider;
let createSession: CreateSessionsService;
let fakeLogErrorsRepository: FakeLogErrorsRepository;

describe('CreateSession', () => {
   beforeEach(() => {
      fakeDeveloperRepository = new FakeDeveloperRepository();
      fakeHashProvider = new FakeHashProvider();
      fakeLogErrorsRepository = new FakeLogErrorsRepository();
      createSession = new CreateSessionsService(
         fakeDeveloperRepository,
         fakeHashProvider,
         fakeLogErrorsRepository,
      );
   });

   it('must be able to login', async () => {
      const developer = await fakeDeveloperRepository.create({
         name: 'Nome Teste',
         email: 'email@email.com',
         password: '123456789',
         sex: 'M',
         age: 0,
         hobby: 'Hobby teste',
         birthDate: new Date(2000, 1, 2),
      });

      const response = await createSession.execute({
         email: 'email@email.com',
         password: '123456789',
      });

      expect(response).toHaveProperty('token');
      expect(response.developer).toEqual(developer);
   });

   it('should not be able to authenticate as the email is incorrect', async () => {
      expect(
         createSession.execute({
            email: 'semail@email.com',
            password: '123456789',
         }),
      ).rejects.toBeInstanceOf(AppError);
   });

   it('should not be able to authenticate as the password is incorrect', async () => {
      await fakeDeveloperRepository.create({
         name: 'Nome Teste',
         email: 'email@email.com',
         password: '123456789',
         sex: 'M',
         age: 0,
         hobby: 'Hobby teste',
         birthDate: new Date(2000, 1, 2),
      });

      expect(
         createSession.execute({
            email: 'email@email.com',
            password: '12345',
         }),
      ).rejects.toBeInstanceOf(AppError);
   });
});

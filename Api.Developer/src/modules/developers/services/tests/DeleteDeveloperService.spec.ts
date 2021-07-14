import 'reflect-metadata';
import { FakeDeveloperRepository } from '@modules/developers/domain/repositories/fakes/FakeDeveloperRepository';
import { DeleteDeveloperService } from '../DeleteDeveloperService';
import { AppError } from '@shared/errors/appError';
import { FakeLogErrorsRepository } from '@modules/logs/errors/domain/repositories/fakes/FakeLogErrorsRepository';

let fakeDeveloperRepository: FakeDeveloperRepository;
let deleteDeveloper: DeleteDeveloperService;
let fakeLogErrorsRepository: FakeLogErrorsRepository;

describe('DeleteDeveloper', () => {
   beforeEach(() => {
      fakeDeveloperRepository = new FakeDeveloperRepository();
      fakeLogErrorsRepository = new FakeLogErrorsRepository();
      deleteDeveloper = new DeleteDeveloperService(
         fakeDeveloperRepository,
         fakeLogErrorsRepository,
      );
   });

   it('must be able to return a developer', async () => {
      const developer = await fakeDeveloperRepository.create({
         name: 'Nome Teste',
         email: 'email@email.com',
         password: '123456789',
         sex: 'M',
         age: 0,
         hobby: 'Hobby teste',
         birthDate: new Date(2000, 1, 2),
      });

      await deleteDeveloper.execute(developer.id);

      expect(await fakeDeveloperRepository.findById(developer.id)).not;
   });

   it('should not be able to return non-existent developer', async () => {
      expect(
         deleteDeveloper.execute('0ed33094-6ef3-4526-af31-d1c51d5b8b50'),
      ).rejects.toBeInstanceOf(AppError);
   });
});

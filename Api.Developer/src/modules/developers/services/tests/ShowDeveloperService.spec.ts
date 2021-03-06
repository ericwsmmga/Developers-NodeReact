import 'reflect-metadata';
import { FakeLogErrorsRepository } from '../../../../modules/logs/errors/domain/repositories/fakes/FakeLogErrorsRepository';
import { AppError } from '../../../../shared/errors/appError';
import { FakeDeveloperRepository } from '../../domain/repositories/fakes/FakeDeveloperRepository';
import { ShowDeveloperService } from '../../services/ShowDeveloperService';

let fakeDeveloperRepository: FakeDeveloperRepository;
let showDeveloper: ShowDeveloperService;
let fakeLogErrorsRepository: FakeLogErrorsRepository;

describe('ShowDeveloper', () => {
   beforeEach(() => {
      fakeDeveloperRepository = new FakeDeveloperRepository();
      fakeLogErrorsRepository = new FakeLogErrorsRepository();
      showDeveloper = new ShowDeveloperService(
         fakeDeveloperRepository,
         fakeLogErrorsRepository,
      );
   });

   it('must be able to return a developer', async () => {
      const developer = await fakeDeveloperRepository.create({
         name: 'Nome Teste',
         email: 'email@email.com',
         sex: 'M',
         age: 0,
         hobby: 'Hobby teste',
         birthDate: new Date(2000, 1, 2),
      });

      expect(await showDeveloper.execute(developer.id)).toHaveProperty('id');
   });

   it('should not be able to return non-existent developer', async () => {
      expect(
         showDeveloper.execute('0ed33094-6ef3-4526-af31-d1c51d5b8b50'),
      ).rejects.toBeInstanceOf(AppError);
   });
});

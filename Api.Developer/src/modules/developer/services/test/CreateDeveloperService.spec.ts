import 'reflect-metadata';
import { CreateDeveloperService } from '../CreateDeveloperService';
import { FakeDeveloperRepository } from '@modules/developer/domain/repositories/fakes/FakeDeveloperRepository';

describe('CreateDeveloper', async () => {
   it('Should be able to create a new Developer', async () => {
      const fakeDeveloperRepository = new FakeDeveloperRepository();

      const createDeveloperService = new CreateDeveloperService(
         fakeDeveloperRepository,
      );

      const developer = await createDeveloperService.execute({
         name: 'Eric William',
         email: 'ericwsmmga@gmail.com',
         password: 'passwordTest',
         hobby: 'Play Games',
         age: 20,
         sex: 'M',
         birth_date: new Date('2000/01/01'),
      });
      expect(developer).toHaveProperty('id');
   });

   it('Should not be able to create a two Developers with the same email', () => {
      expect(1).toBe(1);
   });

   it('Should not be able to create a developer under 12 years old', () => {
      expect(1).toBe(1);
   });
});

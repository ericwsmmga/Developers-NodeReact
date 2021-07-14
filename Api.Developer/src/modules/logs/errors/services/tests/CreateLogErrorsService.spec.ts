import 'reflect-metadata';
import { FakeLogErrorsRepository } from '@modules/logs/errors/domain/repositories/fakes/FakeLogErrorsRepository';
import { CreateLogErrorsService } from '../CreateLogErrorsService';

let fakeLogErrorsRepository: FakeLogErrorsRepository;
let createLogErrors: CreateLogErrorsService;

describe('CreateLogErrors', () => {
   beforeEach(() => {
      fakeLogErrorsRepository = new FakeLogErrorsRepository();
      createLogErrors = new CreateLogErrorsService(fakeLogErrorsRepository);
   });

   it('should be able to create a new developer', () => {
      const message = 'Error';
      const errorLocation = 'Teste';
      const statusCode = 500;

      expect(
         createLogErrors.execute({
            message,
            stack: undefined,
            errorLocation,
            statusCode,
         }),
      ).not;
   });
});

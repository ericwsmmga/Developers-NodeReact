import { LogErrors } from '@modules/logs/errors/infra/typeorm/entities/logErrors';
import { v4 as uuid } from 'uuid';
import { ICreateLogErrors } from '../../models/ICreateLogErrors';
import { ILogErrorsRepository } from '../ILogErrorsRepository';

class FakeLogErrorsRepository implements ILogErrorsRepository {
   private errors: LogErrors[] = [];

   create({
      message,
      stack,
      errorLocation,
      statusCode,
   }: ICreateLogErrors): void {
      const logErrors = new LogErrors();

      logErrors.id = uuid();
      logErrors.message = message;
      logErrors.stack = stack ?? '';
      logErrors.errorLocation = errorLocation;
      logErrors.statusCode = statusCode;

      this.errors.push(logErrors);
   }
}

export { FakeLogErrorsRepository };

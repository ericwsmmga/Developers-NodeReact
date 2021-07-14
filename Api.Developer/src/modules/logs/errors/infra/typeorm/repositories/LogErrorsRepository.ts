import { ICreateLogErrors } from '@modules/logs/errors/domain/models/ICreateLogErrors';
import { ILogErrors } from '@modules/logs/errors/domain/models/ILogErrors';
import { ILogErrorsRepository } from '@modules/logs/errors/domain/repositories/ILogErrorsRepository';
import { getRepository, Repository } from 'typeorm';
import { LogErrors } from '../entities/logErrors';

class LogErrorsRepository implements ILogErrorsRepository {
   private ormRepository: Repository<ILogErrors>;

   constructor() {
      this.ormRepository = getRepository(LogErrors);
   }

   create({
      message,
      stack,
      errorLocation,
      statusCode,
   }: ICreateLogErrors): void {
      const error = this.ormRepository.create({
         message,
         stack,
         errorLocation,
         statusCode,
      });

      this.ormRepository.save(error);
   }
}

export { LogErrorsRepository };

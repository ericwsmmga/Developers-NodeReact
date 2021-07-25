import { getRepository, Repository } from 'typeorm';
import { ICreateLogErrors } from '../../../domain/models/ICreateLogErrors';
import { ILogErrors } from '../../../domain/models/ILogErrors';
import { ILogErrorsRepository } from '../../../domain/repositories/ILogErrorsRepository';
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

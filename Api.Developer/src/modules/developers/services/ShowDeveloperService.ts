import { ILogErrorsRepository } from '@modules/logs/errors/domain/repositories/ILogErrorsRepository';
import { AppError } from '@shared/errors/appError';
import { inject, injectable } from 'tsyringe';
import { IDevelopersRepository } from '../domain/repositories/IDevelopersRepository';
import { returnFormatedDate } from '../helpers/returnFormatedDate';
import { Developer } from '../infra/typeorm/entities/Developer';

@injectable()
class ShowDeveloperService {
   constructor(
      @inject('DevelopersRepository')
      private developerRepository: IDevelopersRepository,
      @inject('LogErrorsRepository')
      private errorsRepository: ILogErrorsRepository,
   ) {}

   async execute(id: string): Promise<Developer> {
      try {
         const developer = await this.developerRepository.findById(id);

         if (!developer) {
            throw new AppError('Developer not found!', 404);
         }

         developer.birthDate = returnFormatedDate(developer.birthDate);

         return developer;
      } catch (error) {
         const message = (error as Error).message;
         const stack = (error as Error).stack;
         const statusCode = 404;

         this.errorsRepository.create({
            message,
            stack,
            errorLocation: 'ShowDeveloperService',
            statusCode,
         });

         throw new AppError(message, statusCode);
      }
   }
}

export { ShowDeveloperService };

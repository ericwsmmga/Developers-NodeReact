import { ILogErrorsRepository } from '@modules/logs/errors/domain/repositories/ILogErrorsRepository';
import { AppError } from '@shared/errors/appError';
import { inject, injectable } from 'tsyringe';
import { IPaginateDeveloper } from '../domain/models/IPaginateDeveloper';
import { IDevelopersRepository } from '../domain/repositories/IDevelopersRepository';
@injectable()
class ListDeveloperService {
   constructor(
      @inject('DevelopersRepository')
      private developerRepository: IDevelopersRepository,
      @inject('ErrorsRepository')
      private errorsRepository: ILogErrorsRepository,
   ) {}

   async execute(field?: string, search?: string): Promise<IPaginateDeveloper> {
      try {
         const developer = await this.developerRepository.find(field, search);

         return developer as IPaginateDeveloper;
      } catch (error) {
         const message = (error as Error).message;
         const stack = (error as Error).stack;
         const statusCode = 400;

         this.errorsRepository.create({
            message,
            stack,
            errorLocation: 'ListDeveloperService',
            statusCode,
         });

         throw new AppError(message, statusCode);
      }
   }
}

export { ListDeveloperService };

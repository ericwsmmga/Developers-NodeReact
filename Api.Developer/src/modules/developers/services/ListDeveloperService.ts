import { ILogErrorsRepository } from '../../../modules/logs/errors/domain/repositories/ILogErrorsRepository';
import { AppError } from '../../../shared/errors/appError';
import { inject, injectable } from 'tsyringe';
import { IPaginateDeveloper } from '../domain/models/IPaginateDeveloper';
import { IDevelopersRepository } from '../domain/repositories/IDevelopersRepository';
import { returnFormatedDate } from '../helpers/returnFormatedDate';
@injectable()
class ListDeveloperService {
   constructor(
      @inject('DevelopersRepository')
      private developerRepository: IDevelopersRepository,
      @inject('LogErrorsRepository')
      private errorsRepository: ILogErrorsRepository,
   ) {}

   async execute(field?: string, search?: string): Promise<IPaginateDeveloper> {
      try {
         const developer = await this.developerRepository.find(field, search);

         developer?.data.forEach(item => {
            item.birthDate = returnFormatedDate(item.birthDate);
         });

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

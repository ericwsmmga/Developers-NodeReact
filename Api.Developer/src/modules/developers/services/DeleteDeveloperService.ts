import { ILogErrorsRepository } from '@modules/logs/errors/domain/repositories/ILogErrorsRepository';
import { AppError } from '@shared/errors/appError';
import { inject, injectable } from 'tsyringe';
import { IDevelopersRepository } from '../domain/repositories/IDevelopersRepository';
@injectable()
class DeleteDeveloperService {
   constructor(
      @inject('DevelopersRepository')
      private developerRepository: IDevelopersRepository,
      @inject('ErrorsRepository')
      private errorsRepository: ILogErrorsRepository,
   ) {}

   async execute(id: string): Promise<void> {
      try {
         const developer = await this.developerRepository.findById(id);

         if (!developer) {
            throw new AppError('Developer not found!', 404);
         }

         developer.deleted_at = new Date();

         await this.developerRepository.save(developer);
      } catch (error) {
         const message = (error as Error).message;
         const stack = (error as Error).stack;
         const statusCode = 400;

         this.errorsRepository.create({
            message,
            stack,
            errorLocation: 'DeleteDeveloperService',
            statusCode,
         });

         throw new AppError(message, statusCode);
      }
   }
}

export { DeleteDeveloperService };

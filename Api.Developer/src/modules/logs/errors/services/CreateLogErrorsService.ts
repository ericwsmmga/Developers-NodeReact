import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { ICreateLogErrors } from '../domain/models/ICreateLogErrors';
import { ILogErrorsRepository } from '../domain/repositories/ILogErrorsRepository';

@injectable()
class CreateLogErrorsService {
   constructor(
      @inject('LogErrorsRepository')
      private errorsRepository: ILogErrorsRepository,
   ) {}

   execute({
      message,
      stack,
      errorLocation,
      statusCode,
   }: ICreateLogErrors): void {
      this.errorsRepository.create({
         message,
         stack,
         errorLocation,
         statusCode,
      });
   }
}

export { CreateLogErrorsService };

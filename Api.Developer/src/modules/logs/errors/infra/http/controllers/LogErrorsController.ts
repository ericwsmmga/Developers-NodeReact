import { container } from 'tsyringe';
import { ICreateLogErrors } from '@modules/logs/errors/domain/models/ICreateLogErrors';
import { CreateLogErrorsService } from '@modules/logs/errors/services/CreateLogErrorsService';

class LogErrorsControllers {
   create({
      message,
      stack,
      errorLocation,
      statusCode,
   }: ICreateLogErrors): void {
      const createDeveloperService = container.resolve(CreateLogErrorsService);

      createDeveloperService.execute({
         message,
         stack,
         errorLocation,
         statusCode,
      });
   }
}

export { LogErrorsControllers };

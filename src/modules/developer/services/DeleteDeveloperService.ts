import { AppError } from '@shared/errors/appError';
import { inject, injectable } from 'tsyringe';
import { IDeveloperRepository } from '../domain/repositories/IDeveloperRepository';

interface IRequest {
   id: string;
}

@injectable()
class DeleteDeveloperService {
   constructor(
      @inject('DeveloperRepository')
      private developerRepository: IDeveloperRepository,
   ) {}

   async execute({ id }: IRequest): Promise<void> {
      const developer = await this.developerRepository.findById(id);

      if (!developer) {
         throw new AppError('Developer not found!', 404);
      }

      developer.deleted_at = new Date();

      await this.developerRepository.save(developer);
   }
}

export { DeleteDeveloperService };

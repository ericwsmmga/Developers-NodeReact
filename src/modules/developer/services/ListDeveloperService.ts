import { AppError } from '@shared/errors/appError';
import { inject, injectable } from 'tsyringe';
import { IDeveloperRepository } from '../domain/repositories/IDeveloperRepository';
import { Developer } from '../infra/typeorm/entities/Developer';

@injectable()
class ListDeveloperService {
   constructor(
      @inject('DeveloperRepository')
      private developerRepository: IDeveloperRepository,
   ) {}
   async execute(): Promise<Developer[]> {
      const developer = await this.developerRepository.find();
      if (!developer) {
         throw new AppError('Developer not found!', 404);
      }
      return developer;
   }
}

export { ListDeveloperService };

import { AppError } from '@shared/errors/appError';
import { inject, injectable } from 'tsyringe';
import { getCustomRepository } from 'typeorm';
import { IDeveloperRepository } from '../domain/repositories/IDeveloperRepository';
import { Developer } from '../infra/typeorm/entities/Developer';
import { DeveloperRepository } from '../infra/typeorm/repositories/DeveloperRepository';

interface IRequest {
   id: string;
}

@injectable()
class ShowDeveloperService {
   constructor(
      @inject('DeveloperRepository')
      private developerRepository: IDeveloperRepository,
   ) {}
   async execute({ id }: IRequest): Promise<Developer> {
      const developer = await this.developerRepository.findById(id);
      if (!developer) {
         throw new AppError('Developer not found!', 404);
      }
      return developer;
   }
}

export { ShowDeveloperService };

import { inject, injectable } from 'tsyringe';
import { IPaginateDeveloper } from '../domain/models/IPaginateDeveloper';
import { IDeveloperRepository } from '../domain/repositories/IDeveloperRepository';

@injectable()
class ShowPaginateDeveloperService {
   constructor(
      @inject('DeveloperRepository')
      private developerRepository: IDeveloperRepository,
   ) {}
   async execute(): Promise<IPaginateDeveloper> {
      const developers = await (
         await this.developerRepository.ShowPaginate()
      ).paginate();

      return developers as IPaginateDeveloper;
   }
}

export { ShowPaginateDeveloperService };

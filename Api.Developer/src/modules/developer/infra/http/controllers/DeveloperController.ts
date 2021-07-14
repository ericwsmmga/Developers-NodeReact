import { Request, Response } from 'express';
import { DeleteDeveloperService } from '@modules/developer/services/DeleteDeveloperService';
import { UpdateDeveloperService } from '../../../services/UpdateDeveloperService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { ListDeveloperService } from '@modules/developer/services/ListDeveloperService';
import { ShowPaginateDeveloperService } from '@modules/developer/services/ShowPaginateDeveloperService';
import { ShowDeveloperService } from '@modules/developer/services/ShowDeveloperService';
import { CreateDeveloperService } from '@modules/developer/services/CreateDeveloperService';

class DeveloperController {
   async index(request: Request, response: Response): Promise<Response> {
      const listDevelopersService = container.resolve(ListDeveloperService);
      const developers = await listDevelopersService.execute();
      return response.json(classToClass(developers));
   }

   async showPaginate(request: Request, response: Response): Promise<Response> {
      const showPaginateDeveloperService = container.resolve(
         ShowPaginateDeveloperService,
      );
      const developers = await showPaginateDeveloperService.execute();
      return response.json(developers);
   }

   async show(request: Request, response: Response): Promise<Response> {
      const { id } = request.params;
      const showDeveloperService = container.resolve(ShowDeveloperService);
      const developer = await showDeveloperService.execute({ id });
      return response.json(classToClass(developer));
   }
   async create(request: Request, response: Response): Promise<Response> {
      const { name, email, password, sex, hobby, birth_date } = request.body;
      const createDeveloperService = container.resolve(CreateDeveloperService);

      const developer = await createDeveloperService.execute({
         name,
         email,
         password,
         sex,
         age: 0,
         hobby,
         birth_date,
      });
      return response.json(classToClass(developer));
   }

   async update(request: Request, response: Response): Promise<Response> {
      const { id } = request.params;

      const { name, email, password, sex, hobby, birth_date } = request.body;

      const updateDeveloperService = container.resolve(UpdateDeveloperService);
      const developer = await updateDeveloperService.execute({
         id,
         name,
         email,
         password,
         sex,
         hobby,
         birth_date,
      });
      return response.json(classToClass(developer));
   }
   async delete(request: Request, response: Response): Promise<Response> {
      const { id } = request.params;
      const deleteDeveloperService = container.resolve(DeleteDeveloperService);
      const developer = await deleteDeveloperService.execute({ id });
      return response.json(classToClass(developer));
   }
}

export { DeveloperController };

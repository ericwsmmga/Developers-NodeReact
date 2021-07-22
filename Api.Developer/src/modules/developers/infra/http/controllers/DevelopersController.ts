import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateDeveloperService } from '../../../services/CreateDeveloperService';
import { DeleteDeveloperService } from '../../../services/DeleteDeveloperService';
import { ListDeveloperService } from '../../../services/ListDeveloperService';
import { ShowDeveloperService } from '../../../services/ShowDeveloperService';
import { UpdateDeveloperService } from '../../../services/UpdateDeveloperService';
import { classToClass } from 'class-transformer';

class DevelopersControllers {
   async index(request: Request, response: Response): Promise<Response> {
      const listDevelopersService = container.resolve(ListDeveloperService);

      const fieldValue = request.query.field;
      const searchValues = request.query.search;

      const developers = await listDevelopersService.execute(
         fieldValue?.toString().toLowerCase(),
         searchValues?.toString(),
      );

      return response.status(200).json(classToClass(developers));
   }

   async show(request: Request, response: Response): Promise<Response> {
      const { id } = request.params;

      const showDeveloperService = container.resolve(ShowDeveloperService);

      const developer = await showDeveloperService.execute(id);

      return response.status(200).json(classToClass(developer));
   }

   async create(request: Request, response: Response): Promise<Response> {
      const { name, email, sex, hobby, birthDate } = request.body;

      const createDeveloperService = container.resolve(CreateDeveloperService);

      const developer = await createDeveloperService.execute({
         name,
         email,
         sex,
         age: 0,
         hobby,
         birthDate,
      });

      return response.status(201).json(classToClass(developer));
   }

   async update(request: Request, response: Response): Promise<Response> {
      const { id } = request.params;

      const { name, email, sex, hobby, birthDate } = request.body;

      const updateDeveloperService = container.resolve(UpdateDeveloperService);

      const developer = await updateDeveloperService.execute({
         id,
         name,
         email,
         sex,
         hobby,
         birthDate,
      });

      return response.status(200).json(classToClass(developer));
   }

   async delete(request: Request, response: Response): Promise<Response> {
      const { id } = request.params;

      const deleteDeveloperService = container.resolve(DeleteDeveloperService);

      const developer = await deleteDeveloperService.execute(id);

      return response.status(204).json(classToClass(developer));
   }
}

export { DevelopersControllers };

import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';
import { DeleteUserService } from '../services/DeleteUserService';
import { ListUserService } from '../services/ListUserService';
import { ShowPaginateUserService } from '../services/ShowPaginateUserService';
import { ShowUserService } from '../services/ShowUserService';
import { UpdateUserService } from '../services/UpdateUserService';
import { classToClass } from 'class-transformer';

class UsersControllers {
   async index(request: Request, response: Response): Promise<Response> {
      const listUserService = new ListUserService();

      const users = await listUserService.execute();

      return response.json(classToClass(users));
   }

   async showPaginate(request: Request, response: Response): Promise<Response> {
      const showPaginateUserService = new ShowPaginateUserService();

      const users = await showPaginateUserService.execute();

      return response.json(users);
   }

   async show(request: Request, response: Response): Promise<Response> {
      const { id } = request.params;

      const showUserService = new ShowUserService();

      const user = await showUserService.execute({ id });

      return response.json(classToClass(user));
   }

   async create(request: Request, response: Response): Promise<Response> {
      const {
         name,
         admin,
         email,
         password,
         sex,
         hobby,
         birth_date,
         technology_id,
      } = request.body;

      const createUserService = new CreateUserService();

      const user = await createUserService.execute({
         name,
         admin,
         email,
         password,
         sex,
         hobby,
         birth_date,
         technology_id,
      });

      return response.json(classToClass(user));
   }

   async update(request: Request, response: Response): Promise<Response> {
      const { id } = request.params;

      const { name, admin, email, password, sex, age, hobby, birth_date } =
         request.body;

      const updateUserService = new UpdateUserService();

      const user = await updateUserService.execute({
         id,
         name,
         admin,
         email,
         password,
         sex,
         hobby,
         birth_date,
      });

      return response.json(classToClass(user));
   }

   async delete(request: Request, response: Response): Promise<Response> {
      const { id } = request.params;

      const deleteUserService = new DeleteUserService();

      const user = await deleteUserService.execute({ id });

      return response.json(classToClass(user));
   }
}

export { UsersControllers };

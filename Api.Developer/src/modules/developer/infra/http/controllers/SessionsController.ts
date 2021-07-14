import { Request, Response } from 'express';
import { CreateSessionsService } from '../../../services/CreateSessionsService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

class SessionsController {
   async create(request: Request, response: Response): Promise<Response> {
      const { email, password } = request.body;
      const createSession = container.resolve(CreateSessionsService);

      const developer = await createSession.execute({
         email,
         password,
      });

      return response.json(classToClass(developer));
   }
}

export { SessionsController };

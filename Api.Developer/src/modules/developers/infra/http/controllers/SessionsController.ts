import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateSessionsService } from '../../../../authentication/services/CreateSessionsService';

class SessionsController {
   async create(request: Request, response: Response): Promise<Response> {
      const { email, password } = request.body;

      const createSession = container.resolve(CreateSessionsService);

      const developer = await createSession.execute({
         email,
         password,
      });

      return response.json(developer);
   }
}

export { SessionsController };

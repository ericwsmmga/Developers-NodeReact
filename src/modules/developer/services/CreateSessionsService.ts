import { AppError } from '@shared/errors/appError';
import { compare, hash } from 'bcryptjs';
import { Developer } from '../infra/typeorm/entities/Developer';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { inject, injectable } from 'tsyringe';
import { IDeveloperRepository } from '../domain/repositories/IDeveloperRepository';
import { Console } from 'console';
interface IRequest {
   email: string;
   password: string;
}

interface IResponse {
   developer: Developer;
   token: string;
}

@injectable()
class CreateSessionsService {
   constructor(
      @inject('DeveloperRepository')
      private developerRepository: IDeveloperRepository,
   ) {}

   async execute({ email, password }: IRequest): Promise<IResponse> {
      const developer = await this.developerRepository.findByEmail(email);

      if (!developer) {
         throw new AppError('Incorrect email/password combination.', 401);
      }

      const passwordConfirmed = await compare(password, developer.password);
      if (!passwordConfirmed) {
         throw new AppError('Incorrect email/password combination.', 401);
      }

      const token = sign({}, authConfig.jwt.secret, {
         subject: developer.id,
         expiresIn: authConfig.jwt.expiresIn,
      });

      return { developer, token };
   }
}

export { CreateSessionsService };

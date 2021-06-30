import { AppError } from '@shared/errors/appError';
import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { UsersRepositories } from '../typeorm/repositories/UsersRepositories';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
interface IRequest {
   email: string;
   password: string;
}

interface IResponse {
   user: User;
   token: string;
}

class CreateSessionsService {
   async execute({ email, password }: IRequest): Promise<IResponse> {
      const userRepository = getCustomRepository(UsersRepositories);
      const user = await userRepository.findByEmail(email);

      if (!user) {
         throw new AppError('Incorrect email/password combination.', 401);
      }

      const passwordConfirmed = await compare(password, user.password);
      if (!passwordConfirmed) {
         throw new AppError('Incorrect email/password combination.', 401);
      }

      const token = sign({}, authConfig.jwt.secret, {
         subject: user.id,
         expiresIn: authConfig.jwt.expiresIn,
      });

      return { user, token };
   }
}

export { CreateSessionsService };

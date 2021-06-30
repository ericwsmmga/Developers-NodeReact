import { AppError } from '@shared/errors/appError';
import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { UsersRepositories } from '../typeorm/repositories/UsersRepositories';

interface IRequest {
   id: string;
}

class ShowUserService {
   async execute({ id }: IRequest): Promise<User> {
      const userRepository = getCustomRepository(UsersRepositories);
      const user = await userRepository.findOne(id);

      if (!user) {
         throw new AppError('User not found!', 404);
      }

      return user;
   }
}

export { ShowUserService };

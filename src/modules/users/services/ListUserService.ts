import { AppError } from '@shared/errors/appError';
import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { UsersRepositories } from '../typeorm/repositories/UsersRepositories';

class ListUserService {
   async execute(): Promise<User[]> {
      const userRepository = getCustomRepository(UsersRepositories);
      const user = userRepository.find();

      if (!user) {
         throw new AppError('User not found!', 404);
      }

      return user;
   }
}

export { ListUserService };

import { AppError } from '@shared/errors/appError';
import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { UsersRepositories } from '../typeorm/repositories/UsersRepositories';

interface IRequest {
   id: string;
}

class DeleteUserService {
   async execute({ id }: IRequest): Promise<void> {
      const userRepository = getCustomRepository(UsersRepositories);
      const user = await userRepository.findOneOrFail(id);

      if (!user) {
         throw new AppError('User not found!', 404);
      }

      user.deleted_at = new Date();

      await userRepository.save(user);
   }
}

export { DeleteUserService };

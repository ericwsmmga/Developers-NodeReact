import { AppError } from '@shared/errors/appError';
import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { UsersRepositories } from '../typeorm/repositories/UsersRepositories';

interface IPaginateCustomer {
   from: number;
   to: number;
   per_page: number;
   total: number;
   current_page: number;
   prev_page: number | null;
   next_page: number | null;
   data: User[];
}

class ShowPaginateUserService {
   async execute(): Promise<IPaginateCustomer> {
      const userRepository = getCustomRepository(UsersRepositories);
      const users = await userRepository.createQueryBuilder().paginate();

      return users as IPaginateCustomer;
   }
}

export { ShowPaginateUserService };

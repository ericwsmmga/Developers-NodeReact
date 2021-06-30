import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/User';

@EntityRepository(User)
class UsersRepositories extends Repository<User> {
   async findByName(name: string): Promise<User | undefined> {
      const user = this.findOne({
         where: {
            name,
         },
      });
      return user;
   }
   async findByEmail(email: string): Promise<User | undefined> {
      const user = this.findOne({
         where: {
            email,
         },
      });
      return user;
   }
}

export { UsersRepositories };

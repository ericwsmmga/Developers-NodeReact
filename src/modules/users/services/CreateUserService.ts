import { AppError } from '@shared/errors/appError';
import CalculateAge from '@shared/helpers/CalculateAge';
import { hash } from 'bcryptjs';
import moment from 'moment';
import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { UsersRepositories } from '../typeorm/repositories/UsersRepositories';

interface IRequest {
   name: string;
   admin: boolean;
   email: string;
   password: string;
   sex: string;
   hobby: string;
   birth_date: Date;
   technology_id: string;
}

class CreateUserService {
   async execute({
      name,
      admin,
      email,
      password,
      sex,
      hobby,
      birth_date,
      technology_id,
   }: IRequest): Promise<User> {
      const userRepository = getCustomRepository(UsersRepositories);
      const userExists = await userRepository.findByEmail(name);

      if (userExists) {
         throw new AppError('There is already a user with this email!');
      }
      var age = CalculateAge(birth_date);

      if (age < 12) {
         throw new AppError('Users under 12 are not allowed !');
      }
      var hashedPassword = await hash(password, 8);
      const user = userRepository.create({
         name,
         admin,
         email,
         password: hashedPassword,
         sex,
         age: age,
         hobby,
         birth_date,
         technology_id,
      });

      await userRepository.save(user);

      return user;
   }
}

export { CreateUserService };

import { AppError } from '@shared/errors/appError';
import CalculateAge from '@shared/helpers/CalculateAge';
import moment from 'moment';
import { getCustomRepository } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { UsersRepositories } from '../typeorm/repositories/UsersRepositories';

interface IRequest {
   id: string;
   name: string;
   admin: boolean;
   email: string;
   password: string;
   sex: string;
   hobby: string;
   birth_date: Date;
}

class UpdateUserService {
   async execute({
      id,
      name,
      admin,
      email,
      password,
      sex,
      hobby,
      birth_date,
   }: IRequest): Promise<User> {
      const userRepository = getCustomRepository(UsersRepositories);
      const user = await userRepository.findOne(id);

      if (!user) {
         throw new AppError('User not found!', 404);
      }

      const userExists = await userRepository.findByName(name);

      if (userExists) {
         throw new AppError('There is already one user with this name!');
      }

      var age = CalculateAge(birth_date);

      if (age < 12) {
         throw new AppError('Users under 12 are not allowed !');
      }
      user.name = name;
      user.admin = admin;
      user.email = email;
      user.password = password;
      user.sex = sex;
      user.age = age;
      user.hobby = hobby;
      user.birth_date = birth_date;

      await userRepository.save(user);

      return user;
   }
}

export { UpdateUserService };

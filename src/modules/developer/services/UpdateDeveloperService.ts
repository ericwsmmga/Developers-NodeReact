import { AppError } from '@shared/errors/appError';
import CalculateAge from '@shared/helpers/CalculateAge';
import { inject, injectable } from 'tsyringe';
import { IDeveloperRepository } from '../domain/repositories/IDeveloperRepository';
import { Developer } from '../infra/typeorm/entities/Developer';

interface IRequest {
   id: string;
   name: string;
   email: string;
   password: string;
   sex: string;
   hobby: string;
   birth_date: Date;
}

@injectable()
class UpdateDeveloperService {
   constructor(
      @inject('DeveloperRepository')
      private developerRepository: IDeveloperRepository,
   ) {}
   async execute({
      id,
      name,
      email,
      password,
      sex,
      hobby,
      birth_date,
   }: IRequest): Promise<Developer> {
      const developer = await this.developerRepository.findById(id);

      if (!developer) {
         throw new AppError('Developer not found!', 404);
      }

      const developerExists = await this.developerRepository.findByName(name);

      if (developerExists) {
         throw new AppError('There is already one developer with this name!');
      }
      var age = CalculateAge(birth_date);
      if (age < 12) {
         throw new AppError('Developer under 12 are not allowed !');
      }
      developer.name = name;
      developer.email = email;
      developer.password = password;
      developer.sex = sex;
      developer.age = age;
      developer.hobby = hobby;
      developer.birth_date = birth_date;
      await this.developerRepository.save(developer);

      return developer;
   }
}

export { UpdateDeveloperService };

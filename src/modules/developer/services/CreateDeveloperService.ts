import { AppError } from '@shared/errors/appError';
import CalculateAge from '@shared/helpers/CalculateAge';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { ICreateDeveloper } from '../domain/models/ICreateDeveloper';
import { IDeveloper } from '../domain/models/IDeveloper';
import { IDeveloperRepository } from '../domain/repositories/IDeveloperRepository';

@injectable()
class CreateDeveloperService {
   private developerRepository: IDeveloperRepository;
   constructor(
      @inject('DeveloperRepository') developerRepository: IDeveloperRepository,
   ) {}

   async execute({
      name,
      email,
      password,
      sex,
      hobby,
      birth_date,
   }: ICreateDeveloper): Promise<IDeveloper> {
      const developerExists = await this.developerRepository.findByEmail(email);
      if (developerExists) {
         throw new AppError('There is already a Developer with this email!');
      }
      var age = CalculateAge(birth_date);

      if (age < 12) {
         throw new AppError('Developers under 12 are not allowed !');
      }
      var hashedPassword = await hash(password, 8);
      const developer = await this.developerRepository.create({
         name,
         email,
         password: hashedPassword,
         sex,
         age: age,
         hobby,
         birth_date,
      });
      return developer;
   }
}

export { CreateDeveloperService };

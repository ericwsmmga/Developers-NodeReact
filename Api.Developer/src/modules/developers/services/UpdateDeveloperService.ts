import { ILogErrorsRepository } from '@modules/logs/errors/domain/repositories/ILogErrorsRepository';
import { AppError } from '@shared/errors/appError';
import { inject, injectable } from 'tsyringe';
import { IDeveloper } from '../domain/models/IDeveloper';
import { IUpdateDeveloper } from '../domain/models/IUpdateDeveloper';
import { IDevelopersRepository } from '../domain/repositories/IDevelopersRepository';
import { calculateAge } from '../helpers/calculateAge';
import { returnFormatedDate } from '../helpers/returnFormatedDate';
import { sexIsValid } from '../helpers/validateSex';
import { Developer } from '../infra/typeorm/entities/Developer';
import { IHashProvider } from '../providers/hashprovider/models/IHashProvider';

@injectable()
class UpdateDeveloperService {
   constructor(
      @inject('DevelopersRepository')
      private developerRepository: IDevelopersRepository,
      @inject('HashProvider')
      private hashProvider: IHashProvider,
      @inject('LogErrorsRepository')
      private errorsRepository: ILogErrorsRepository,
   ) {}

   async execute({
      id,
      name,
      email,
      sex,
      hobby,
      birthDate,
   }: IUpdateDeveloper): Promise<Developer> {
      try {
         const developer = await this.developerRepository.findById(id);

         if (!developer) {
            throw new AppError('Developer not found!', 404);
         }

         const developerExists = await this.developerRepository.findByEmail(
            email,
         );

         if (!this.isValidEmail(developer.id, email, developerExists)) {
            throw new AppError(
               'There is already one developer with this email!',
            );
         }

         if (sex && (sex.length > 2 || !sexIsValid(sex.toUpperCase()))) {
            throw new AppError(
               "The sex informed is not valid. Gender must be 'Feminine(F)', 'Masculine(M)', 'Not Binary(NB)' or 'Others(O)'",
            );
         }

         developer.name = name ? name : developer.name;
         developer.email = email ? email : developer.email;
         developer.sex = sex ? sex : developer.sex;
         developer.hobby = hobby ? hobby : developer.hobby;
         developer.birthDate = birthDate ? birthDate : developer.birthDate;
         developer.age = birthDate ? calculateAge(birthDate) : developer.age;

         await this.developerRepository.save(developer);

         developer.birthDate = returnFormatedDate(developer.birthDate);

         return developer;
      } catch (error) {
         const message = (error as Error).message;
         const stack = (error as Error).stack;
         const statusCode = 400;

         this.errorsRepository.create({
            message,
            stack,
            errorLocation: 'UpdateDeveloperService',
            statusCode,
         });

         throw new AppError(message, statusCode);
      }
   }

   private isValidEmail(
      developerId: string,
      email: string,
      developerEmail: IDeveloper | undefined,
   ): boolean {
      return (
         !developerEmail ||
         developerId === developerEmail.id ||
         developerEmail.email != email
      );
   }
}

export { UpdateDeveloperService };

import 'reflect-metadata';
import { AppError } from '@shared/errors/appError';
import { inject, injectable } from 'tsyringe';
import { ICreateDeveloper } from '../domain/models/ICreateDeveloper';
import { IDeveloper } from '../domain/models/IDeveloper';
import { IDevelopersRepository } from '../domain/repositories/IDevelopersRepository';
import { IHashProvider } from '../providers/hashprovider/models/IHashProvider';
import { ILogErrorsRepository } from '@modules/logs/errors/domain/repositories/ILogErrorsRepository';
import { calculateAge } from '../helpers/calculateAge';
import { sexIsValid } from '../helpers/validateSex';

@injectable()
class CreateDeveloperService {
   constructor(
      @inject('DevelopersRepository')
      private developerRepository: IDevelopersRepository,
      @inject('HashProvider')
      private hashProvider: IHashProvider,
      @inject('LogErrorsRepository')
      private errorsRepository: ILogErrorsRepository,
   ) {}

   async execute({
      name,
      email,
      password,
      sex,
      hobby,
      birthDate,
   }: ICreateDeveloper): Promise<IDeveloper> {
      try {
         const developerExists = await this.developerRepository.findByEmail(
            email,
         );

         if (developerExists) {
            throw new AppError(
               'There is already one developer with this email!',
            );
         }

         if (sex.length > 2 || !sexIsValid(sex.toUpperCase())) {
            throw new AppError(
               "The sex informed is not valid. Gender must be 'Feminine(F)', 'Masculine(M)', 'Not Binary(NB)' or 'Others(O)'",
            );
         }

         const calculatedAge = calculateAge(birthDate);

         const hashedPassword = await this.hashProvider.generateHash(password);

         const developer = await this.developerRepository.create({
            name,
            email,
            password: hashedPassword,
            sex: sex.toUpperCase(),
            age: calculatedAge,
            hobby,
            birthDate,
         });

         return developer;
      } catch (error) {
         const message = (error as Error).message;
         const stack = (error as Error).stack;
         const statusCode = 400;

         this.errorsRepository.create({
            message,
            stack,
            errorLocation: 'CreateDeveloperService',
            statusCode,
         });

         throw new AppError(message, statusCode);
      }
   }
}

export { CreateDeveloperService };

import { AppError } from '@shared/errors/appError';
import { Secret, sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { inject, injectable } from 'tsyringe';
import { IDevelopersRepository } from '../../developers/domain/repositories/IDevelopersRepository';
import { IHashProvider } from '../../developers/providers/hashprovider/models/IHashProvider';
import { IAuthenticated } from '@modules/authentication/domain/models/IAuthenticated';
import { ICreateSession } from '@modules/authentication/domain/models/ICreateSession';
import { ILogErrorsRepository } from '@modules/logs/errors/domain/repositories/ILogErrorsRepository';

@injectable()
class CreateSessionsService {
   constructor(
      @inject('DevelopersRepository')
      private developerRepository: IDevelopersRepository,
      @inject('HashProvider')
      private hashProvider: IHashProvider,
      @inject('ErrorsRepository')
      private errorsRepository: ILogErrorsRepository,
   ) {}

   async execute({ email, password }: ICreateSession): Promise<IAuthenticated> {
      try {
         const developer = await this.developerRepository.findByEmail(email);

         if (!developer) {
            throw new AppError('Incorrect email/password combinations!', 401);
         }

         const passwordConfirmed = await this.hashProvider.compareHash(
            password,
            developer.password,
         );

         if (!passwordConfirmed) {
            throw new AppError('Incorrect email/password combinations!', 401);
         }

         const token = sign({}, authConfig.jwt.secret as Secret, {
            subject: developer.id,
            expiresIn: authConfig.jwt.expiresIn,
         });

         return {
            developer,
            token,
         };
      } catch (error) {
         const message = (error as Error).message;
         const stack = (error as Error).stack;
         const statusCode = 400;

         this.errorsRepository.create({
            message,
            stack,
            errorLocation: 'CreateSessionsService',
            statusCode,
         });

         throw new AppError(message, statusCode);
      }
   }
}

export { CreateSessionsService };

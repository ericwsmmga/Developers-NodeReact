import moment from 'moment';
import { AppError } from '../../../shared/errors/appError';

function calculateAge(birthDate: Date): number {
   const age = moment().diff(birthDate, 'years');

   if (!age || age < 12) {
      throw new AppError('The age cannot be less than 12 years old!');
   }

   return age;
}

export { calculateAge };

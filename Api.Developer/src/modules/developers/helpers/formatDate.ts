import { addHours } from 'date-fns';

function formatDate(birthDate: Date): Date {
   const addedDate = addHours(birthDate, 2);

   return addedDate;
}

export { formatDate };

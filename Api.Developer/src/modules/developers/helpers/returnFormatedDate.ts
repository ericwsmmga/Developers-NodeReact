import { format } from 'date-fns-tz';

function returnFormatedDate(birthDate: Date): Date {
   const date = format(birthDate, 'dd/MM/yyyy', {
      timeZone: 'America/Sao_Paulo',
   });

   return date as unknown as Date;
}

export { returnFormatedDate };

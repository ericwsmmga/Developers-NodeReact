import { Sex } from '../enums/sexEnum';

function sexIsValid(sex: string): boolean {
   const sexCategories = Object.values(Sex);
   const sexArray = sexCategories as string[];

   return sexArray.includes(sex, 0);
}

export { sexIsValid };

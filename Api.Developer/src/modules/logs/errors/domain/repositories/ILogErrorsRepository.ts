import { ICreateLogErrors } from '../models/ICreateLogErrors';

interface ILogErrorsRepository {
   create(data: ICreateLogErrors): void;
}

export { ILogErrorsRepository };

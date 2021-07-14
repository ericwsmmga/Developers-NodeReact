import { IDeveloper } from '../../../developers/domain/models/IDeveloper';

interface IAuthenticated {
   developer: IDeveloper;
   token: string;
}

export { IAuthenticated };

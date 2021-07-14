import { ICreateDeveloper } from '../models/ICreateDeveloper';
import { IDeveloper } from '../models/IDeveloper';
import { IPaginateDeveloper } from '../models/IPaginateDeveloper';

interface IDevelopersRepository {
   findByEmail(email: string): Promise<IDeveloper | undefined>;
   findById(id: string): Promise<IDeveloper | undefined>;
   findByName(name: string): Promise<IDeveloper | undefined>;
   create(data: ICreateDeveloper): Promise<IDeveloper>;
   save(developer: IDeveloper): Promise<IDeveloper>;
   find(
      field?: string,
      search?: string,
   ): Promise<IPaginateDeveloper | undefined>;
   remove(developer: IDeveloper): Promise<void>;
}

export { IDevelopersRepository };

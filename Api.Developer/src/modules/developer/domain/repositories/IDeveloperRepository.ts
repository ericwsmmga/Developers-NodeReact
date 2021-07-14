import { Developer } from '@modules/developer/infra/typeorm/entities/Developer';
import { SelectQueryBuilder } from 'typeorm';
import { ICreateDeveloper } from '../models/ICreateDeveloper';
import { IDeveloper } from '../models/IDeveloper';

interface IDeveloperRepository {
   findByName(name: string): Promise<IDeveloper | undefined>;
   findByEmail(email: string): Promise<IDeveloper | undefined>;
   findById(id: string): Promise<IDeveloper | undefined>;
   create(data: ICreateDeveloper): Promise<IDeveloper>;
   save(developer: IDeveloper): Promise<IDeveloper>;
   findAll(): Promise<IDeveloper[]>;
   ShowPaginate(): Promise<SelectQueryBuilder<Developer | undefined>>;
}

export { IDeveloperRepository };

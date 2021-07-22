import { v4 as uuid } from 'uuid';
import { ICreateDeveloper } from '@modules/developers/domain/models/ICreateDeveloper';
import { IDevelopersRepository } from '@modules/developers/domain/repositories/IDevelopersRepository';
import { Developer } from '@modules/developers/infra/typeorm/entities/Developer';
import { IPaginateDeveloper } from '../../models/IPaginateDeveloper';
import { IDeveloper } from '../../models/IDeveloper';

class FakeDeveloperRepository implements IDevelopersRepository {
   private developers: Developer[] = [];

   async create({
      name,
      email,
      sex,
      age,
      hobby,
      birthDate,
   }: ICreateDeveloper): Promise<IDeveloper> {
      const developer = new Developer();

      developer.id = uuid();
      developer.name = name;
      developer.email = email;
      developer.sex = sex;
      developer.age = age;
      developer.hobby = hobby;
      developer.birthDate = birthDate;

      this.developers.push(developer);

      return developer;
   }

   async save(developer: Developer): Promise<IDeveloper> {
      const findIndex = this.developers.findIndex(
         findDeveloper => findDeveloper.id === developer.id,
      );

      this.developers[findIndex] = developer;

      return developer;
   }

   async find(): Promise<IPaginateDeveloper | undefined> {
      const developersPaginate = {
         from: 1,
         to: 1,
         per_page: 1,
         total: 1,
         current_page: 1,
         prev_page: null,
         next_page: null,
         data: this.developers,
      };

      return developersPaginate;
   }

   // eslint-disable-next-line @typescript-eslint/no-empty-function
   async remove(developer: Developer): Promise<void> {}

   async findByEmail(email: string): Promise<Developer | undefined> {
      const developer = this.developers.find(
         developer => developer.email === email,
      );
      return developer;
   }

   async findById(id: string): Promise<IDeveloper | undefined> {
      const developer = this.developers.find(developer => developer.id === id);
      return developer;
   }

   async findByName(name: string): Promise<IDeveloper | undefined> {
      const developer = this.developers.find(
         developer => developer.name === name,
      );
      return developer;
   }
}

export { FakeDeveloperRepository };

import { v4 as uuidv4 } from 'uuid';
import { ICreateDeveloper } from '@modules/developer/domain/models/ICreateDeveloper';
import { IDeveloperRepository } from '@modules/developer/domain/repositories/IDeveloperRepository';
import { Developer } from '@modules/developer/infra/typeorm/entities/Developer';
import { SelectQueryBuilder } from 'typeorm';

class FakeDeveloperRepository implements IDeveloperRepository {
   private developer: Developer[] = [];

   public async create({
      name,
      email,
      password,
      sex,
      age,
      hobby,
      birth_date,
   }: ICreateDeveloper): Promise<Developer> {
      const developer = new Developer();
      developer.name = name;
      developer.email = email;
      developer.password = password;
      developer.sex = sex;
      developer.age = age;
      developer.hobby = hobby;
      developer.birth_date = birth_date;

      this.developer.push(developer);

      return developer;
   }

   public async save(developer: Developer): Promise<Developer> {
      Object.assign(this.developer, developer);
      return developer;
   }

   public async findByName(name: string): Promise<Developer | undefined> {
      const developer = this.developer.find(
         developer => developer.name == name,
      );
      return developer;
   }

   public async findByEmail(email: string): Promise<Developer | undefined> {
      const developer = this.developer.find(
         developer => developer.email == email,
      );
      return developer;
   }

   public async findById(id: string): Promise<Developer | undefined> {
      const developer = this.developer.find(developer => developer.id == id);
      return developer;
   }

   public async findAll(): Promise<Developer[] | undefined> {
      return undefined;
   }

   public async ShowPaginate(): Promise<SelectQueryBuilder<Developer>> {
      return undefined;
   }
}

export { FakeDeveloperRepository };

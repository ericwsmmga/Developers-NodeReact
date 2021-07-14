import { ICreateDeveloper } from '@modules/developer/domain/models/ICreateDeveloper';
import { IDeveloperRepository } from '@modules/developer/domain/repositories/IDeveloperRepository';
import { getRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { Developer } from '../entities/Developer';

class DeveloperRepository implements Omit<IDeveloperRepository, ''> {
   private ormRepository: Repository<Developer>;
   constructor() {
      this.ormRepository = getRepository(Developer);
   }

   public async create({
      name,
      email,
      password,
      sex,
      age,
      hobby,
      birth_date,
   }: ICreateDeveloper): Promise<Developer> {
      const developer = this.ormRepository.create({
         name,
         email,
         password,
         sex,
         age,
         hobby,
         birth_date,
      });
      await this.ormRepository.save(developer);
      return developer;
   }

   public async save(developer: Developer): Promise<Developer> {
      await this.ormRepository.save(developer);
      return developer;
   }
   public async findByName(name: string): Promise<Developer | undefined> {
      const developer = this.ormRepository.findOne({
         where: {
            name,
         },
      });
      return developer;
   }
   public async findByEmail(email: string): Promise<Developer | undefined> {
      const developer = this.ormRepository.findOne({
         where: {
            email,
         },
      });
      return developer;
   }
   public async findById(id: string): Promise<Developer | undefined> {
      const developer = this.ormRepository.findOne({
         where: {
            id,
         },
      });
      return developer;
   }
   public async findAll(): Promise<Developer[] | undefined> {
      const developers = this.ormRepository.find();
      return developers;
   }
   public async ShowPaginate(): Promise<SelectQueryBuilder<Developer>> {
      const developers = this.ormRepository.createQueryBuilder();
      return developers;
   }
}

export { DeveloperRepository };

import { ICreateDeveloper } from '@modules/developers/domain/models/ICreateDeveloper';
import { IDeveloper } from '@modules/developers/domain/models/IDeveloper';
import { IPaginateDeveloper } from '@modules/developers/domain/models/IPaginateDeveloper';
import { IDevelopersRepository } from '@modules/developers/domain/repositories/IDevelopersRepository';
import { getRepository, Repository } from 'typeorm';
import { Developer } from '../entities/Developer';

class DevelopersRepository implements IDevelopersRepository {
   private ormRepository: Repository<IDeveloper>;

   constructor() {
      this.ormRepository = getRepository(Developer);
   }

   async create({
      name,
      email,
      sex,
      age,
      hobby,
      birthDate,
   }: ICreateDeveloper): Promise<IDeveloper> {
      const developer = this.ormRepository.create({
         name,
         email,
         sex,
         age,
         hobby,
         birthDate,
      });

      await this.ormRepository.save(developer);

      return developer;
   }

   async save(developer: Developer): Promise<IDeveloper> {
      await this.ormRepository.save(developer);

      return developer;
   }

   public async remove(developer: Developer): Promise<void> {
      await this.ormRepository.save(developer);
   }

   async find(
      field?: string,
      search?: string,
   ): Promise<IPaginateDeveloper | undefined> {
      if (field && search) {
         return (await this.ormRepository
            .createQueryBuilder('developers')
            .where(`LOWER(${field}) LIKE :query`, {
               query: `%${search.toLowerCase()}%`,
            })
            .orderBy(`${field}`)
            .paginate(5)) as IPaginateDeveloper;
      } else {
         return (await this.ormRepository
            .createQueryBuilder()
            .orderBy('name')
            .paginate(5)) as IPaginateDeveloper;
      }
   }

   async findByEmail(email: string): Promise<IDeveloper | undefined> {
      const developer = this.ormRepository.findOne({
         where: {
            email,
         },
         withDeleted: false,
      });

      return developer;
   }

   async findById(id: string): Promise<IDeveloper | undefined> {
      const developer = await this.ormRepository.findOne({
         where: {
            id,
         },
         withDeleted: false,
      });

      return developer;
   }

   async findByName(name: string): Promise<IDeveloper | undefined> {
      const developer = this.ormRepository.findOne({
         where: {
            name,
         },
         withDeleted: false,
      });

      return developer;
   }
}

export { DevelopersRepository };

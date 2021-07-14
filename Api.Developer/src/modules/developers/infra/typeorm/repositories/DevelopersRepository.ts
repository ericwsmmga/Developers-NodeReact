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
      password,
      sex,
      age,
      hobby,
      birthDate,
   }: ICreateDeveloper): Promise<IDeveloper> {
      const developer = this.ormRepository.create({
         name,
         email,
         password,
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
      const developers = await this.ormRepository
         .createQueryBuilder()
         .where(`developers.${field} LIKE :search`, { search: `%${search}%` })
         .paginate(5);

      return developers as IPaginateDeveloper;
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

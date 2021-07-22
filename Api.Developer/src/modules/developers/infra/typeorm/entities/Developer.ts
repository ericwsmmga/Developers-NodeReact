import {
   Column,
   CreateDateColumn,
   DeleteDateColumn,
   Entity,
   Index,
   PrimaryColumn,
   UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { v4 as uuid } from 'uuid';
import { IDeveloper } from '@modules/developers/domain/models/IDeveloper';

@Entity('developers')
class Developer implements IDeveloper {
   @Index('pk-idx')
   @PrimaryColumn()
   id: string;

   @Column()
   name: string;

   @Column()
   email: string;
   @Column()
   sex: string;

   @Column()
   age: number;

   @Column()
   hobby: string;

   @Column()
   birthDate: Date;

   @Exclude()
   @CreateDateColumn()
   created_at: Date;

   @Exclude()
   @UpdateDateColumn()
   updated_at: Date;

   @Exclude()
   @DeleteDateColumn()
   deleted_at: Date;

   constructor() {
      if (!this.id) {
         this.id = uuid();
      }
   }
}

export { Developer };

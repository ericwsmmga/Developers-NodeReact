import {
   Column,
   CreateDateColumn,
   DeleteDateColumn,
   Entity,
   PrimaryColumn,
   UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Exclude } from 'class-transformer';
import { IDeveloper } from '@modules/developer/domain/models/IDeveloper';

@Entity('developers')
class Developer implements IDeveloper {
   @PrimaryColumn()
   readonly id: string;
   @Column()
   name: string;
   @Column()
   email: string;
   @Exclude()
   @Column()
   password: string;
   @Column()
   sex: string;
   @Column()
   age: number;
   @Column()
   hobby: string;
   @Column()
   birth_date: Date;
   @CreateDateColumn()
   created_at: Date;
   @UpdateDateColumn()
   updated_at: Date;
   @DeleteDateColumn()
   deleted_at: Date;
   constructor() {
      if (!this.id) {
         this.id = uuid();
      }
   }
}

export { Developer };

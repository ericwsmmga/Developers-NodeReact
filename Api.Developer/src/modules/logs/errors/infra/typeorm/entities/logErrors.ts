import { Exclude } from 'class-transformer';
import {
   Column,
   CreateDateColumn,
   DeleteDateColumn,
   Entity,
   PrimaryColumn,
   UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { ILogErrors } from '../../../domain/models/ILogErrors';

@Entity('logErrors')
class LogErrors implements ILogErrors {
   @PrimaryColumn()
   id: string;

   @Column()
   message: string;

   @Column()
   stack: string;

   @Column()
   errorLocation: string;

   @Column()
   statusCode: number;

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

export { LogErrors };

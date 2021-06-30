import {
   Column,
   CreateDateColumn,
   DeleteDateColumn,
   Entity,
   JoinColumn,
   ManyToOne,
   PrimaryColumn,
   UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Exclude } from 'class-transformer';

@Entity('users')
class User {
   @PrimaryColumn()
   readonly id: string;

   @Column()
   admin: boolean;

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

   @Column()
   technology_id: string;
   constructor() {
      if (!this.id) {
         this.id = uuid();
      }
   }
}

export { User };

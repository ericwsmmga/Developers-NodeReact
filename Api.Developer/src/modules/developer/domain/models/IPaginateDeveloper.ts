import { Developer } from '@modules/developer/infra/typeorm/entities/Developer';

interface IPaginateDeveloper {
   from: number;
   to: number;
   per_page: number;
   total: number;
   current_page: number;
   prev_page: number | null;
   next_page: number | null;
   data: Developer[];
}
export { IPaginateDeveloper };

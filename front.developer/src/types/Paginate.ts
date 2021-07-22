import { Developer } from "./Developer";

export type Paginate = {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  last_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Developer[];
};

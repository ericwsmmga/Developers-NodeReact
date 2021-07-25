import { Paginate } from "../types/Paginate";
export type SearchType = {
  developers: Paginate;
  fieldValue: string;
  searchValues: string;
  page: number;
};

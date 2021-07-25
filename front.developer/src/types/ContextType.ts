import { SearchType } from "../types/SearchType";

export type ContextType = {
  search: SearchType;
  setSearch: (
    fieldValue?: string,
    searchValues?: string,
    page?: number
  ) => Promise<void>;
};

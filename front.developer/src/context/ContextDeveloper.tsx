import api from "../api";
import { Paginate } from "../types/Paginate";
import { SearchType } from "../types/SearchType";
import { ContextType } from "../types/ContextType";
import { createContext, ReactNode, useState } from "react";

type DeveloperContextProviderProps = {
  children: ReactNode;
};

export const ContextDeveloper = createContext({} as ContextType);

export function ContextDeveloperProvider(props: DeveloperContextProviderProps) {
  const [search, setDevelopers] = useState<SearchType>({} as SearchType);

  async function setSearch(
    fieldValue?: string,
    searchValue?: string,
    page?: number
  ) {
    const response = await api.get("/developers", {
      params: {
        field: fieldValue ?? search.fieldValue,
        search: searchValue ?? search.searchValues,
        page: page ?? search.page,
      },
    });
    const developers: Paginate = {
      from: response?.data.from,
      to: response?.data.to,
      per_page: response?.data.per_page,
      total: response?.data.total,
      current_page: response?.data.current_page,
      prev_page: response?.data.prev_page,
      next_page: response?.data.next_page,
      data: response?.data.data,
      last_page: response?.data.last_page,
    };
    setDevelopers({
      developers: developers,
      fieldValue: fieldValue ?? search?.fieldValue,
      searchValues: searchValue ?? search.searchValues,
      page: page ?? search.page,
    });
  }
  return (
    <ContextDeveloper.Provider value={{ search: search, setSearch: setSearch }}>
      {props.children}
    </ContextDeveloper.Provider>
  );
}

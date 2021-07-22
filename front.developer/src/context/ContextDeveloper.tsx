import api from "../api";
import { Developer } from "../types/Developer";
import { createContext, ReactNode, useState } from "react";
import { Paginate } from "../types/Paginate";

type ContextType = {
  search: SearchType;
  setSearch: (fieldValue?: string, searchValues?: string) => Promise<void>;
};

type SearchType = {
  developers: Paginate;
  fieldValue: string;
  searchValues: string;
};

type DeveloperContextProviderProps = {
  children: ReactNode;
};

export const ContextDeveloper = createContext({} as ContextType);

export function ContextDeveloperProvider(props: DeveloperContextProviderProps) {
  const [search, setDevelopers] = useState<SearchType>({} as SearchType);

  async function setSearch(fieldValue?: string, searchValue?: string) {
    const response = await api.get("/developers", {
      params: {
        fieldValue: fieldValue ?? search?.fieldValue,
        searchValues: searchValue ?? search.searchValues,
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

    console.log(developers);

    // const developers: Developer[] = response?.data.data.map(
    //   (dev: Developer) => {
    //     return {
    //       id: dev.id,
    //       name: dev.name,
    //       age: dev.age,
    //       hobby: dev.hobby,
    //       sex: dev.sex,
    //       birthDate: dev.birthDate,
    //     };
    //   }
    // );

    setDevelopers({
      developers: developers,
      fieldValue: fieldValue ?? search?.fieldValue,
      searchValues: searchValue ?? search.searchValues,
    });
  }
  return (
    <ContextDeveloper.Provider value={{ search: search, setSearch: setSearch }}>
      {props.children}
    </ContextDeveloper.Provider>
  );
}

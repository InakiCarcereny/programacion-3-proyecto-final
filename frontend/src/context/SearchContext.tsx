/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  type JSX,
  type ReactNode,
} from "react";

interface SearchContextType {
  query: string;
  setQuery: (query: string) => void;
  clearQuery: () => void;
}

const SearchContext = createContext<SearchContextType | null>(null);

export function useSearch(): SearchContextType {
  const context = useContext(SearchContext);
  if (!context)
    throw new Error("useSearch must be used within a SearchProvider");
  return context;
}

export function SearchProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [query, setQuery] = useState("");

  const clearQuery = (): void => setQuery("");

  return (
    <SearchContext.Provider value={{ query, setQuery, clearQuery }}>
      {children}
    </SearchContext.Provider>
  );
}

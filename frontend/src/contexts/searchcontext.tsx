import React, { createContext, useContext, useState } from "react";

type SearchState = {
    query: string;
    setQuery: (q: string) => void;
};

const SearchContext = createContext<SearchState | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [query, setQuery] = useState("");
    return <SearchContext.Provider value={{ query, setQuery }}>{children}</SearchContext.Provider>;
};

export function useSearch() {
    const ctx = useContext(SearchContext);
    if (!ctx) throw new Error("useSearch must be used within SearchProvider");
    return ctx;
}


import React, { createContext, useContext, useState } from "react";
/* eslint-disable react-refresh/only-export-components */

type Category = "all" | "mctoys" | "bktoys";
type Filters = { category: Category; minPrice: number; maxPrice: number; };

type SearchState = {
    query: string;
    setQuery: (q: string) => void;
    filters: Filters;
    setFilters: (patch: Partial<Filters>) => void;
    resetFilters: () => void;
};

const defaultFilters: Filters = { category: "all", minPrice: 0, maxPrice: 99999 };

const SearchContext = createContext<SearchState | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [query, setQuery] = useState("");
    const [filters, setFiltersState] = useState<Filters>(defaultFilters);

    function setFilters(patch: Partial<Filters>) {
        setFiltersState(prev => ({ ...prev, ...patch }));
    }
    function resetFilters() {
        setFiltersState(defaultFilters);
    }

    const value = React.useMemo(() => ({ query, setQuery, filters, setFilters: (p: Partial<Filters>) => setFilters(p), resetFilters }), [query, filters]);
    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};

export function useSearch() {
    const ctx = useContext(SearchContext);
    if (!ctx) throw new Error("useSearch must be used within SearchProvider");
    return ctx;
}


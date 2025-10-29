import React, { useRef } from "react";
import { useSearch } from "../contexts/searchcontext";
import "./searchbar.css";

export default function SearchBar() {
    const { query, setQuery } = useSearch();
    const inputRef = useRef<HTMLInputElement | null>(null);

    return (
        <div className="searchbar" role="search" aria-label="Buscar productos">
            <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                <path fill="currentColor" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" />
            </svg>

            <input
                ref={inputRef}
                className="search-input"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar juguetes..."
                aria-label="Buscar juguetes"
            />

            {query && (
                <button
                    type="button"
                    className="search-clear"
                    aria-label="Limpiar búsqueda"
                    onClick={() => { setQuery(""); inputRef.current?.focus(); }}
                >
                </button>
            )}
        </div>
    );
}


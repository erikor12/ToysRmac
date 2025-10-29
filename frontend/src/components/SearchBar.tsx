import React, { useEffect, useRef, useState } from "react";
import { useSearch } from "../contexts/searchcontext";
import { useNavigate } from "react-router-dom";
import "./searchbar-with-results.css";

// Mock product data (local fallback to avoid missing module)
const mctoys: { id: string; title: string; price?: number; short?: string }[] = [
    { id: "m1", title: "Mc Happy Toy Astronauta", price: 7.0, short: "Astronauta" },
    { id: "m2", title: "Mc Happy Toy Pirata", price: 8.0, short: "Pirata" },
    { id: "m3", title: "Mc Happy Toy Evangelion", price: 99.99, short: "EVA-01" },
];

const bktoys: { id: string; title: string; price?: number; short?: string }[] = [
    { id: "b1", title: "BK King Robot", price: 7.0, short: "Robot" },
    { id: "b2", title: "BK King Dragon", price: 8.0, short: "Dragging deez nuts" },
    { id: "b3", title: "BK King Sonic", price: 9.0, short: "El herizo azul" },
];

type Item = { id: string; title: string; price?: number; short?: string; source: "mctoys" | "bktoys" };

export default function SearchBar() {
    const { query, setQuery } = useSearch();
    const [local, setLocal] = useState(query);
    const [open, setOpen] = useState(false);
    const [results, setResults] = useState<Item[]>([]);
    const ref = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Actualiza local cuando query global cambie (p. ej. por reset)
    useEffect(() => setLocal(query), [query]);

    // Cerrar dropdown al click fuera
    useEffect(() => {
        function onDoc(e: MouseEvent) {
            if (!ref.current) return;
            if (!ref.current.contains(e.target as Node)) setOpen(false);
        }
        document.addEventListener("mousedown", onDoc);
        return () => document.removeEventListener("mousedown", onDoc);
    }, []);

    // Buscar en ambas colecciones forzosamente (ignora filtros de categoría)
    useEffect(() => {
        const q = (local || "").trim().toLowerCase();
        if (!q) {
            setResults([]);
            return;
        }

        const searchIn = (arr: any[], source: Item["source"]) =>
            arr
                .map((p) => ({
                    id: p.id,
                    title: p.title ?? "",
                    price: p.price,
                    short: p.short ?? "",
                    source,
                }))
                .filter(
                    (it) =>
                        it.title.toLowerCase().includes(q) ||
                        (it.short ?? "").toLowerCase().includes(q)
                );

        const r1 = searchIn(mctoys, "mctoys");
        const r2 = searchIn(bktoys, "bktoys");

        // juntar y limitar (ej: 6 por colección)
        setResults([...r1.slice(0, 6), ...r2.slice(0, 6)]);
    }, [local]);

    // Cuando el usuario selecciona un resultado: seteamos query global y navegamos
    function handleSelect(item: Item) {
        setQuery(item.title); // actualiza la query global para coherencia
        setLocal(item.title);
        setOpen(false);

        // Navegación: envía al usuario a la ruta de la colección y pasa el id en state
        // Asumimos que tienes rutas /mctoys y /bktoys que pueden leer location.state.selectedId
        navigate(item.source === "mctoys" ? "/mctoys" : "/bktoys", {
            state: { selectedId: item.id },
        });
    }

    return (
        <div className="sb-root" ref={ref}>
            <div className="searchbar" role="search" aria-label="Buscar productos">
                <input
                    ref={inputRef}
                    className="search-input"
                    type="search"
                    value={local}
                    onChange={(e) => {
                        setLocal(e.target.value);
                        setOpen(true);
                    }}
                    onFocus={() => setOpen(true)}
                    placeholder="Buscar juguetes..."
                    aria-label="Buscar juguetes"
                />

                {local && (
                    <button
                        className="search-clear"
                        onClick={() => {
                            setLocal("");
                            setQuery("");
                            setResults([]);
                            inputRef.current?.focus();
                        }}
                        aria-label="Limpiar búsqueda"
                        type="button"
                    >
                        ✕
                    </button>
                )}
            </div>

            {open && results.length > 0 && (
                <div className="sb-results" role="listbox" aria-label="Resultados de búsqueda">
                    {/* Agrupar visualmente por fuente */}
                    <div className="sb-group">
                        <div className="sb-group-title">McToys</div>
                        {results
                            .filter((r) => r.source === "mctoys")
                            .map((r) => (
                                <button
                                    key={`m-${r.id}`}
                                    className="sb-item"
                                    onClick={() => handleSelect(r)}
                                    type="button"
                                >
                                    <div className="sb-item-title">{r.title}</div>
                                    <div className="sb-item-meta">{r.short}</div>
                                </button>
                            ))}
                        {results.filter((r) => r.source === "mctoys").length === 0 && (
                            <div className="sb-empty">Sin coincidencias</div>
                        )}
                    </div>

                    <div className="sb-group">
                        <div className="sb-group-title">BK Toys</div>
                        {results
                            .filter((r) => r.source === "bktoys")
                            .map((r) => (
                                <button
                                    key={`b-${r.id}`}
                                    className="sb-item"
                                    onClick={() => handleSelect(r)}
                                    type="button"
                                >
                                    <div className="sb-item-title">{r.title}</div>
                                    <div className="sb-item-meta">{r.short}</div>
                                </button>
                            ))}
                        {results.filter((r) => r.source === "bktoys").length === 0 && (
                            <div className="sb-empty">Sin coincidencias</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}


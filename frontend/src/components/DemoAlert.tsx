import { useEffect, useState } from "react";

export default function DemoAlert({
    localStorageKey = "seenDemoAlert",
    title = "Página de prueba",
    message = "Esta es una versión de prueba. Los datos pueden ser ficticios y algunas funciones no están completas.",
    showAlways = false, // si true ignora localStorage y muestra siempre
}: {
    localStorageKey?: string;
    title?: string;
    message?: string;
    showAlways?: boolean;
}) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (showAlways) {
            setOpen(true);
            return;
        }
        try {
            const seen = window.localStorage.getItem(localStorageKey);
            if (!seen) setOpen(true);
        } catch {
            setOpen(true);
        }
    }, [localStorageKey, showAlways]);

    function handleClose(neverAgain = false) {
        if (neverAgain) {
            try {
                window.localStorage.setItem(localStorageKey, "1");
            } catch { }
        }
        setOpen(false);
    }

    if (!open) return null;

    return (
        <div className="da-overlay" role="dialog" aria-modal="true" aria-label={title} onClick={() => handleClose(false)}>
            <div className="da-card" onClick={(e) => e.stopPropagation()}>
                <header className="da-header">
                    <h2 className="da-title">{title}</h2>
                </header>

                <div className="da-body">
                    <p>{message}</p>
                </div>

                <footer className="da-footer">
                    <button className="da-btn da-btn-ghost" onClick={() => handleClose(false)}>Cerrar</button>
                    <button className="da-btn da-btn-primary" onClick={() => handleClose(true)}>No mostrar de nuevo</button>
                </footer>
            </div>
        </div>
    );
}


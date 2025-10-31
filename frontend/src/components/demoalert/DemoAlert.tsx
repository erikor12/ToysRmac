import { useEffect, useState } from "react";

export default function DemoAlert({
    localStorageKey = "seenDemoAlert",
    title = "Página de prueba",
    message1 = "Esta es una versión de prueba. Los datos pueden ser ficticios y algunas funciones no están completas.",
    message2 = "También es posible que la aplicación tarde en cargar los datos de la API (Productos y clientes), esto es un problema se debe a que Render la relentiza despues de 15 minutos de inactividad debido a las limitaciones del plan gratuito",
    message3 = "Para solucionar esto, simplemente haz que aparezca el error de HTTP 500, espera un minuto y recarga la página.",
    showAlways = false, // si true ignora localStorage y muestra siempre
}: {
    localStorageKey?: string;
    title?: string;
    message1?: string;
    message2?: string;
    message3?: string;
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
        } catch (e) {
            console.warn('DemoAlert: could not read localStorage', e);
            setOpen(true);
        }
    }, [localStorageKey, showAlways]);

    function handleClose(neverAgain = false) {
        if (neverAgain) {
            try {
                window.localStorage.setItem(localStorageKey, "1");
            } catch (e) { console.warn('DemoAlert: could not write localStorage', e); }
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
                    <p>{message1}</p>
                    <p>{message2}</p>
                    <p>{message3}</p>
                </div>

                <footer className="da-footer">
                    <button className="da-btn da-btn-ghost" onClick={() => handleClose(false)}>Cerrar</button>
                    <button className="da-btn da-btn-primary" onClick={() => handleClose(true)}>No mostrar de nuevo</button>
                </footer>
            </div>
        </div>
    );
}


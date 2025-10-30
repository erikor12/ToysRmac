import { useEffect } from "react";
import "./accountnotice.css";

type Props = {
    open: boolean;
    onClose: (proceed?: boolean) => void;
    title?: string;
    message?: string;
    localStorageKey?: string;
};

export default function AccountNotice({
    open,
    onClose,
    title = "Aviso importante",
    message = "Estás usando una versión de prueba. Los datos podrían no persistir en este entorno.",
    localStorageKey,
}: Props) {
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") onClose(false);
        }
        if (open) document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open) return null;

    function handleNeverAgain() {
        if (localStorageKey) {
            try { localStorage.setItem(localStorageKey, "1"); } catch { }
        }
        onClose(false);
    }

    return (
        <div className="an-overlay" role="dialog" aria-modal="true" aria-label={title} onClick={() => onClose(false)}>
            <div className="an-card" onClick={(e) => e.stopPropagation()}>
                <header className="an-header"><h2>{title}</h2></header>
                <div className="an-body"><p>{message}</p></div>
                <footer className="an-footer">
                    <button className="an-btn an-ghost" onClick={() => onClose(false)}>Cancelar</button>
                    <button className="an-btn an-primary" onClick={() => onClose(true)}>Continuar</button>
                </footer>
                {localStorageKey && (
                    <div className="an-footer-extra">
                        <button className="an-link" onClick={handleNeverAgain}>No mostrar de nuevo</button>
                    </div>
                )}
            </div>
        </div>
    );
}


import { useEffect } from "react";
import "./purchasemodal.css";

type Props = Readonly<{
    open: boolean;
    onClose: (confirmed?: boolean) => void;
    title?: string;
    lines?: string[];
    total?: number;
}>;

export default function PurchaseModal({ open, onClose, title = 'Gracias por tu compra', lines = [], total }: Props) {
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') onClose();
        }
        if (open) document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    if (!open) return null;

    function overlayKeyDown(e: React.KeyboardEvent) {
        if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') onClose();
    }

    return (
        <button className="pm-overlay" type="button" aria-label={title} onClick={() => onClose()} onKeyDown={overlayKeyDown}>
                <dialog className="pm-card" open aria-label={title}>
                <header className="pm-header">
                    <h2 className="pm-title">{title}</h2>
                </header>

                <div className="pm-body">
                    <ul>
                        {lines.map((l: string) => (
                            <li key={String(l)}>{l}</li>
                        ))}
                    </ul>
                    <div className="pm-total">Total: <strong>${total?.toFixed(2) ?? '0.00'}</strong></div>
                </div>

                <footer className="pm-footer">
                    <button className="pm-btn pm-btn-primary" onClick={() => onClose(true)}>Aceptar</button>
                </footer>
                </dialog>
        </button>
    );
}

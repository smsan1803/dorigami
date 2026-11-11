import { useEffect } from "react";
import { WORKS } from "../i18n";
import { label } from "./Sections";

export default function Lightbox({ t, index, setIndex }) {
  const open = index !== null;
  const n = WORKS.length;
  const close = () => setIndex(null);
  const prev = (e) => { e?.stopPropagation(); setIndex((i) => (i + n - 1) % n); };
  const next = (e) => { e?.stopPropagation(); setIndex((i) => (i + 1) % n); };

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      className={`lb${open ? " on" : ""}`}
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <button className="x" aria-label="Zatvori" onClick={close}>✕</button>
      <button className="p" aria-label="Prethodni" onClick={prev}>←</button>
      <button className="n" aria-label="Sljedeći" onClick={next}>→</button>
      {open && (
        <>
          <img src={WORKS[index].src} alt={label(t, index)} />
          <div className="cap">{label(t, index)}</div>
        </>
      )}
    </div>
  );
}

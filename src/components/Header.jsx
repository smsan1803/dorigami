import { useEffect, useState } from "react";
import Ros from "./Ros";

const LINKS = [
  ["#o-meni", "nav_about"],
  ["#radovi", "nav_works"],
  ["#setnja", "nav_walk"],
  ["#tehnike", "nav_tech"],
  ["#cjenik", "nav_prices"],
  ["#kontakt", "nav_contact"],
];

export default function Header({ t, lang, setLang }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cls = [solid && "solid", open && "open"].filter(Boolean).join(" ");

  return (
    <header id="top" className={cls}>
      <div className="wrap nav">
        <a className="logo" href="#pocetna">
          <Ros />
          Dorigami
        </a>
        <ul className="menu" id="menu">
          {LINKS.map(([href, key]) => (
            <li key={key}>
              <a href={href} onClick={() => setOpen(false)}>
                {t[key]}
              </a>
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div className="lang" role="group" aria-label="Jezik / Language">
            {["hr", "en"].map((l) => (
              <button key={l} className={lang === l ? "on" : ""} onClick={() => setLang(l)}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button className="burger" aria-label="Izbornik" id="burger" onClick={() => setOpen((o) => !o)}>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}

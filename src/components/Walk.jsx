import { useCallback, useEffect, useRef, useState } from "react";
import { WORKS } from "../i18n";
import { label } from "./Sections";

// Redoslijed radova u virtualnoj šetnji
const ORDER = [2, 0, 4, 1, 5, 3];

export default function Walk({ t, onOpen, lightboxOpen }) {
  const trackRef = useRef(null);
  const exRefs = useRef([]);
  const curRef = useRef(0);
  const timerRef = useRef(null);
  const [cur, setCur] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [quote, setQuote] = useState("");
  const [quoteVisible, setQuoteVisible] = useState(true);

  const setActive = (k) => {
    curRef.current = k;
    setCur(k);
  };

  const go = useCallback((k) => {
    const n = ORDER.length;
    k = (k + n) % n;
    const track = trackRef.current;
    const e = exRefs.current[k];
    if (track && e) {
      track.scrollTo({ left: e.offsetLeft - (track.clientWidth - e.clientWidth) / 2, behavior: "smooth" });
    }
    setActive(k);
  }, []);

  const stop = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setPlaying(false);
  }, []);

  const togglePlay = () => {
    if (timerRef.current) return stop();
    setPlaying(true);
    go(curRef.current + 1);
    timerRef.current = setInterval(() => go(curRef.current + 1), 3800);
  };

  // citat se mijenja s laganim fadeom
  useEffect(() => {
    setQuoteVisible(false);
    const id = setTimeout(() => {
      setQuote(`„${t.quotes[cur % t.quotes.length]}”`);
      setQuoteVisible(true);
    }, 250);
    return () => clearTimeout(id);
  }, [cur, t]);

  // praćenje ručnog scrollanja
  useEffect(() => {
    const track = trackRef.current;
    let st;
    const onScroll = () => {
      clearTimeout(st);
      st = setTimeout(() => {
        const c = track.scrollLeft + track.clientWidth / 2;
        let best = 0, bd = 1e9;
        exRefs.current.forEach((e, i) => {
          const d = Math.abs(e.offsetLeft + e.clientWidth / 2 - c);
          if (d < bd) { bd = d; best = i; }
        });
        if (best !== curRef.current) setActive(best);
      }, 90);
    };
    track.addEventListener("scroll", onScroll);
    return () => { track.removeEventListener("scroll", onScroll); clearTimeout(st); };
  }, []);

  // strelice na tipkovnici kad je šetnja na ekranu
  useEffect(() => {
    const onKey = (e) => {
      if (lightboxOpen) return;
      const r = trackRef.current.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        if (e.key === "ArrowRight") { stop(); go(curRef.current + 1); }
        if (e.key === "ArrowLeft") { stop(); go(curRef.current - 1); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightboxOpen, go, stop]);

  // početna pozicija + čišćenje timera
  useEffect(() => {
    const center = () => {
      const track = trackRef.current, e = exRefs.current[0];
      if (track && e) track.scrollLeft = e.offsetLeft - (track.clientWidth - e.clientWidth) / 2;
    };
    if (document.readyState === "complete") center();
    else window.addEventListener("load", center);
    return () => { window.removeEventListener("load", center); clearInterval(timerRef.current); };
  }, []);

  return (
    <section className="walk" id="setnja">
      <div className="wrap">
        <div className="eyebrow">{t.walk_eyebrow}</div>
        <h2>{t.walk_title}</h2>
        <p className="lead" style={{ marginTop: 16 }}>{t.walk_lead}</p>
      </div>
      <div className="room">
        <div className="track" id="track" ref={trackRef}>
          {ORDER.map((wi, k) => (
            <div
              key={wi}
              ref={(el) => (exRefs.current[k] = el)}
              className={`exhibit${cur === k ? " active" : ""}`}
              onClick={() => (cur === k ? onOpen(wi) : go(k))}
            >
              <div className="light"></div>
              <div className="string"></div>
              <div className="art">
                <img src={WORKS[wi].src} alt={label(t, wi)} loading="lazy" />
              </div>
              <div className="plate">{label(t, wi)}</div>
            </div>
          ))}
        </div>
        <div className="floor"></div>
      </div>
      <div className="walk-ctrl">
        <button aria-label="Prethodni" onClick={() => { stop(); go(curRef.current - 1); }}>←</button>
        <button className="play" onClick={togglePlay}>{playing ? t.walk_pause : t.walk_play}</button>
        <button aria-label="Sljedeći" onClick={() => { stop(); go(curRef.current + 1); }}>→</button>
      </div>
      <div className="dots">
        {ORDER.map((_, k) => <i key={k} className={cur === k ? "on" : ""}></i>)}
      </div>
      <p className="walk-quote" style={{ opacity: quoteVisible ? 1 : 0 }}>{quote}</p>
    </section>
  );
}

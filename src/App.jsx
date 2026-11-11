import { useEffect, useState } from "react";
import { T } from "./i18n";
import Header from "./components/Header";
import Walk from "./components/Walk";
import Lightbox from "./components/Lightbox";
import { Hero, About, Gallery, Techniques, Stand, Prices, Contact, Footer } from "./components/Sections";

function initialLang() {
  try {
    const s = localStorage.getItem("dorigami-lang");
    if (s && T[s]) return s;
  } catch (e) {}
  return "hr";
}

export default function App() {
  const [lang, setLang] = useState(initialLang);
  const [lbIndex, setLbIndex] = useState(null);
  const t = T[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem("dorigami-lang", lang); } catch (e) {}
  }, [lang]);

  // animacija pojavljivanja (.rv -> .in)
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Header t={t} lang={lang} setLang={setLang} />
      <Hero t={t} />
      <div className="motif" role="presentation"></div>
      <About t={t} />
      <Gallery t={t} onOpen={setLbIndex} />
      <Walk t={t} onOpen={setLbIndex} lightboxOpen={lbIndex !== null} />
      <Techniques t={t} />
      <Stand t={t} />
      <Prices t={t} />
      <Contact t={t} />
      <Footer t={t} />
      <Lightbox t={t} index={lbIndex} setIndex={setLbIndex} />
    </>
  );
}

import Ros from "./Ros";
import { WORKS } from "../i18n";

export const label = (t, i) => `${t.work} ${String(i + 1).padStart(2, "0")}`;

export function Hero({ t }) {
  return (
    <section className="hero" id="pocetna">
      <Ros className="ghost" />
      <Ros className="ghost two" />
      <div className="wrap hero-grid">
        <div className="rv">
          <div className="eyebrow">{t.hero_eyebrow}</div>
          <h1 dangerouslySetInnerHTML={{ __html: t.hero_title }} />
          <p>{t.hero_text}</p>
          <div className="btns">
            <a className="btn fill" href="#radovi">{t.hero_btn1}</a>
            <a className="btn line" href="#setnja">{t.hero_btn2}</a>
          </div>
        </div>
        <div className="arch rv">
          <div className="frame">
            <img src="/img/rad-2.jpg" alt={t.alt_hero} />
          </div>
          <Ros className="badge" />
        </div>
      </div>
      <div className="scroll-hint">{t.scroll}</div>
    </section>
  );
}

export function About({ t }) {
  return (
    <section className="about" id="o-meni">
      <div className="wrap about-grid">
        <div className="portrait rv">
          <div className="ring r2"></div>
          <div className="ring"></div>
          <img src="/img/dora-portret.jpg" alt="Dora Carević" loading="lazy" />
          <Ros className="mini" />
        </div>
        <div className="rv">
          <div className="eyebrow">{t.about_eyebrow}</div>
          <h2>{t.about_title}</h2>
          <p className="lead" style={{ margin: "22px 0 22px" }}>{t.about_lead}</p>
          <p>{t.about_p1}</p>
          <p>{t.about_p2}</p>
          <div className="sig">Dora</div>
          <div className="facts">
            {[1, 2, 3].map((n) => (
              <div key={n}>
                <b>{t[`f${n}b`]}</b>
                <span>{t[`f${n}s`]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Gallery({ t, onOpen }) {
  return (
    <section className="gallery" id="radovi">
      <div className="wrap">
        <div className="head-row rv">
          <div>
            <div className="eyebrow">{t.gal_eyebrow}</div>
            <h2>{t.gal_title}</h2>
          </div>
        </div>
        <div className="grid" id="grid">
          {WORKS.map((w, i) => (
            <figure
              key={w.src}
              className="card rv"
              tabIndex={0}
              onClick={() => onOpen(i)}
              onKeyDown={(e) => e.key === "Enter" && onOpen(i)}
            >
              <img src={w.src} alt={label(t, i)} loading="lazy" />
              <figcaption>
                <span className="t">{label(t, i)}</span>
                <small className="c">{t.cat}</small>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="grid-note rv">
          <span>{t.gal_note}</span> —{" "}
          <a href="https://www.instagram.com/dorigami84/" target="_blank" rel="noopener">
            @dorigami84
          </a>
        </p>
      </div>
    </section>
  );
}

export function Techniques({ t }) {
  return (
    <section className="techniques" id="tehnike">
      <div className="wrap">
        <div className="eyebrow">{t.tech_eyebrow}</div>
        <h2>{t.tech_title}</h2>
        <p className="lead" style={{ marginTop: 16 }}>{t.tech_lead}</p>
        <div className="tech-grid">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div className="tech rv" key={n}>
              <Ros className="corner" />
              <div className="num">{String(n).padStart(2, "0")}</div>
              <h3>{t[`t${n}h`]}</h3>
              <p>{t[`t${n}p`]}</p>
            </div>
          ))}
          <div className="tech wide rv">
            <div>
              <div className="num" style={{ color: "var(--ochre-lt)" }}>✦</div>
              <h3>{t.t7h}</h3>
              <p>{t.t7p}</p>
            </div>
            <img
              src="/img/rad-5.jpg"
              alt=""
              loading="lazy"
              style={{ aspectRatio: "16/10", objectPosition: "center 40%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Stand({ t }) {
  return (
    <section className="stand">
      <div className="wrap stand-grid">
        <div className="stand-img rv">
          <img src="/img/stand.jpg" alt={t.alt_stand} loading="lazy" />
        </div>
        <div className="rv">
          <div className="eyebrow">{t.st_eyebrow}</div>
          <h2>{t.st_title}</h2>
          <p className="lead" style={{ margin: "20px 0 28px" }}>{t.st_lead}</p>
          <a className="btn fill" href="https://www.instagram.com/dorigami84/" target="_blank" rel="noopener">
            {t.st_btn}
          </a>
        </div>
      </div>
    </section>
  );
}

const PRICES = [
  { n: 1, feat: false, rows: [["a", 15, false], ["b", 20, false], ["c", 25, false]] },
  { n: 2, feat: true, rows: [["a", 35, true], ["b", 60, true], ["c", 95, true]] },
  { n: 3, feat: false, rows: [["a", 8, true], ["b", 12, true], ["c", 35, true]] },
];

export function Prices({ t }) {
  return (
    <section className="prices" id="cjenik">
      <div className="wrap">
        <div className="eyebrow">{t.pr_eyebrow}</div>
        <h2>{t.pr_title}</h2>
        <p className="lead" style={{ marginTop: 16 }}>{t.pr_lead}</p>
        <div className="price-grid">
          {PRICES.map(({ n, feat, rows }) => (
            <div className={`pcard${feat ? " feat" : ""} rv`} key={n}>
              <h3>
                <Ros />
                <span>{t[`p${n}h`]}</span>
              </h3>
              <div className="from">{t[`p${n}f`]}</div>
              <ul>
                {rows.map(([k, price, from]) => (
                  <li key={k}>
                    <span>{t[`p${n}${k}`]}</span>
                    <b>{from ? `${t.from} ${price} €` : `${price} €`}</b>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="price-note">
          {[1, 2, 3].map((n) => (
            <div className="rv" key={n}>
              <i>✦</i>
              <span>{t[`pn${n}`]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact({ t }) {
  return (
    <section className="contact" id="kontakt">
      <Ros className="ghost" />
      <div className="wrap" style={{ position: "relative" }}>
        <div className="eyebrow">{t.ct_eyebrow}</div>
        <h2>{t.ct_title}</h2>
        <p className="lead" style={{ marginTop: 16 }}>{t.ct_lead}</p>
        <div className="contact-cards">
          <a className="cc" href="tel:+385917863554">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2" />
            </svg>
            <div>
              <small>{t.ct_tel}</small>
              <span>091 786 3554</span>
            </div>
          </a>
          <a className="cc" href="https://www.instagram.com/dorigami84/" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" />
            </svg>
            <div>
              <small>Instagram</small>
              <span>@dorigami84</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer({ t }) {
  return (
    <footer>
      <div className="wrap">
        <span>© {new Date().getFullYear()} Dorigami · Dora Carević</span>
        <span>{t.ft}</span>
      </div>
    </footer>
  );
}

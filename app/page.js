"use client";
import { useState, useEffect, useRef } from "react";
import { SHOP, CRACKERS, FLOWERS } from "../data/config";

function Icon({ t, c }) {
  const S = {
    rocket: <><path d="M32 6c8 10 8 24 0 36-8-12-8-26 0-36z" fill={c} /><path d="M24 40l-8 10 12-4zM40 40l8 10-12-4z" fill="#FFB627" /><circle cx="32" cy="22" r="4" fill="#1B0A2A" /><path d="M28 46q4 14 8 0z" fill="#FF6B2C" /></>,
    anar: <><path d="M18 58l4-26h20l4 26z" fill={c} /><path d="M32 28V8M32 28L18 12M32 28l14-16M32 28L12 22M32 28l20-6" stroke="#FFB627" strokeWidth="3" strokeLinecap="round" /></>,
    chakri: <><circle cx="32" cy="32" r="24" fill="none" stroke={c} strokeWidth="5" strokeDasharray="30 8" /><circle cx="32" cy="32" r="12" fill="none" stroke="#FFB627" strokeWidth="4" strokeDasharray="14 6" /><circle cx="32" cy="32" r="3" fill={c} /></>,
    spark: <><path d="M32 58V28" stroke={c} strokeWidth="4" strokeLinecap="round" /><path d="M32 6v16M14 14l12 10M50 14L38 24M10 30h14M54 30H40" stroke="#FFB627" strokeWidth="3" strokeLinecap="round" /></>,
    bomb: <><circle cx="32" cy="38" r="20" fill={c} /><path d="M32 18q4-8 12-8" stroke="#FFF4E0" strokeWidth="3" fill="none" /><circle cx="46" cy="10" r="4" fill="#FFB627" /></>,
    ladi: <>{[0, 1, 2, 3, 4].map((i) => <circle key={i} cx={12 + i * 10} cy={20 + (i % 2) * 22} r="7" fill={c} />)}<path d="M12 20L22 42L32 20L42 42L52 20" stroke="#FFF4E0" strokeWidth="2" fill="none" /></>,
    flower: <>{[0, 60, 120, 180, 240, 300].map((a) => <ellipse key={a} cx="32" cy="18" rx="7" ry="13" fill={c} transform={`rotate(${a} 32 32)`} />)}<circle cx="32" cy="32" r="6" fill="#FF6B2C" /></>,
  };
  return <svg viewBox="0 0 64 64" aria-hidden="true">{S[t]}</svg>;
}

function Fireworks() {
  const r = useRef();
  useEffect(() => {
    const cv = r.current, x = cv.getContext("2d");
    let W, H, P = [], raf;
    const fit = () => { W = cv.width = cv.offsetWidth; H = cv.height = cv.offsetHeight; };
    fit(); addEventListener("resize", fit);
    const burst = (px, py) => { const h = Math.random() * 360; for (let i = 0; i < 70; i++) { const a = (Math.PI * 2 * i) / 70, s = 1 + Math.random() * 3.5; P.push({ x: px, y: py, vx: Math.cos(a) * s, vy: Math.sin(a) * s, l: 1, h: h + Math.random() * 40 }); } };
    const loop = () => {
      x.globalCompositeOperation = "source-over"; x.fillStyle = "rgba(27,10,42,.22)"; x.fillRect(0, 0, W, H);
      x.globalCompositeOperation = "lighter"; P = P.filter((p) => p.l > 0);
      P.forEach((p) => { p.x += p.vx; p.y += p.vy; p.vy += 0.04; p.vx *= 0.985; p.l -= 0.011; x.fillStyle = `hsla(${p.h},100%,60%,${p.l})`; x.fillRect(p.x, p.y, 2.2, 2.2); });
      raf = requestAnimationFrame(loop);
    };
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = calm ? 0 : setInterval(() => burst(Math.random() * W, Math.random() * H * 0.6), 1100);
    loop(); burst(W / 2, H * 0.35);
    const click = (e) => burst(e.offsetX, e.offsetY); cv.addEventListener("click", click);
    return () => { cancelAnimationFrame(raf); clearInterval(t); removeEventListener("resize", fit); };
  }, []);
  return <canvas ref={r} className="fw" />;
}

export default function Home() {
  const [tab, setTab] = useState("crackers"), [cart, setCart] = useState({}), [open, setOpen] = useState(false);
  const all = [...CRACKERS, ...FLOWERS], list = tab === "crackers" ? CRACKERS : FLOWERS;
  const add = (id, d = 1) => setCart((c) => { const n = (c[id] || 0) + d, o = { ...c }; n <= 0 ? delete o[id] : (o[id] = n); return o; });
  const items = all.filter((p) => cart[p.id]), count = Object.values(cart).reduce((a, b) => a + b, 0);
  const text = `Namaste ${SHOP.name}! 🪔\nMujhe ye order karna hai:\n` + items.map((p) => `• ${p.name} x ${cart[p.id]}`).join("\n") + `\n\nHome delivery chahiye. Rate bata dijiye.`;
  const wa = `https://wa.me/${SHOP.phone}?text=${encodeURIComponent(text)}`;
  const hello = `https://wa.me/${SHOP.phone}?text=${encodeURIComponent("Namaste! Diwali order ke baare me puchna tha.")}`;

  return (
    <>
      <nav className="nav">
        <span className="logo">🪔 {SHOP.name}</span>
        <button className="btn" onClick={() => setOpen(true)}>Cart ({count})</button>
      </nav>

      <header className="hero">
        <Fireworks />
        <div className="heroin">
          <h1>{SHOP.name}</h1>
          <p>{SHOP.tagline}</p>
          <div className="cta">
            <a className="btn" href="#shop">Shop now</a>
            <a className="btn ghost" href={hello} target="_blank" rel="noreferrer">Chat on WhatsApp</a>
          </div>
        </div>
      </header>

      <section className="strip">
        <div><b>Home delivery available</b>Ghar baithe order karo</div>
        <div><b>Order on WhatsApp</b>Cart bhejo, hum confirm karenge</div>
        <div><b>Rates coming soon</b>Diwali offers jaldi aa rahe hain</div>
      </section>

      <main className="shop" id="shop">
        <h2>Crackers & Flowers</h2>
        <div className="tabs" role="tablist">
          <button className={`tab ${tab === "crackers" ? "on" : ""}`} onClick={() => setTab("crackers")}>Crackers</button>
          <button className={`tab ${tab === "flowers" ? "on" : ""}`} onClick={() => setTab("flowers")}>Flowers</button>
        </div>
        <div className="grid">
          {list.map((p) => (
            <article className="card" key={p.id}>
              <Icon t={p.type} c={p.color} />
              <h3>{p.name}</h3>
              <small>{p.hi}</small>
              <div className="rate">{p.price ? `₹${p.price}` : "Rate coming soon"}</div>
              <button className="btn" onClick={() => add(p.id)}>Add to cart</button>
            </article>
          ))}
        </div>
      </main>

      {open && <div className="veil" onClick={() => setOpen(false)} />}
      <aside className={`drawer ${open ? "open" : ""}`} aria-hidden={!open}>
        <h2>Your cart</h2>
        <div className="list">
          {!items.length && <p>Cart khali hai. Kuch crackers ya flowers add karo.</p>}
          {items.map((p) => (
            <div className="row" key={p.id}>
              <span>{p.name}</span>
              <span className="qty"><button onClick={() => add(p.id, -1)}>−</button><span>{cart[p.id]}</span><button onClick={() => add(p.id)}>+</button></span>
            </div>
          ))}
        </div>
        {items.length > 0 && <a className="btn" href={wa} target="_blank" rel="noreferrer">Order on WhatsApp</a>}
        <button className="btn ghost" onClick={() => setOpen(false)}>Close</button>
      </aside>

      <footer className="foot">
        <p>© {new Date().getFullYear()} {SHOP.name} · Home delivery available · <a href={hello} target="_blank" rel="noreferrer">WhatsApp {SHOP.phone.slice(2)}</a></p>
        <p>Crackers adults ki nigrani me, khuli jagah par hi jalayein.</p>
      </footer>
    </>
  );
}

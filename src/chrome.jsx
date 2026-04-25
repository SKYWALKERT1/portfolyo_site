/* global React, window */
(() => {
const { useEffect, useState, useRef, useMemo } = window.React;

// ------------- Top Bar -------------
function TopBar({ route, onNav, theme, onToggleTheme, lang, onLang, onOpenPalette }) {
  const items = [
    { k: "work",    label: window.I18N[lang].nav_work },
    { k: "about",   label: window.I18N[lang].nav_about },
    { k: "writing", label: window.I18N[lang].nav_writing },
    { k: "uses",    label: window.I18N[lang].nav_uses },
  ];
  const here = route.name === "case" ? "work" : route.name;

  return (
    <header className="topbar">
      <div className="shell topbar-row">
        <button className="brand" onClick={() => onNav("home")} aria-label="home">
          <span className="brand-sig" />
          <span className="brand-name brand-full">
            <b>Furkan Fatih Çiftçi</b>
            <span className="brand-role">ML · edge-ai</span>
          </span>
        </button>

        <nav className="nav" aria-label="primary">
          {items.map((it) => (
            <button
              key={it.k}
              onClick={() => onNav(it.k)}
              aria-current={here === it.k ? "page" : undefined}
            >
              {it.label}
            </button>
          ))}
          <a
            className="nav-cv"
            href="uploads/furkan_fatih_ciftci_cv.pdf"
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily: "var(--font-mono)", fontSize: 12,
              padding: "6px 10px", borderRadius: 6, color: "var(--fg-1)",
            }}
          >
            {window.I18N[lang].nav_cv}
          </a>
        </nav>

        <div className="top-actions">
          <button className="pill-btn" onClick={onOpenPalette} aria-label="open command palette">
            <Icon.search />
            <span>search</span>
            <kbd>/</kbd>
          </button>

          <div className="lang-toggle" role="group" aria-label="language">
            <button data-active={lang === "en"} onClick={() => onLang("en")}>EN</button>
            <button data-active={lang === "tr"} onClick={() => onLang("tr")}>TR</button>
          </div>

          <button className="icon-btn" onClick={onToggleTheme} aria-label="toggle theme">
            {theme === "dark" ? <Icon.sun /> : <Icon.moon />}
          </button>
        </div>
      </div>
    </header>
  );
}

// ------------- Command Palette -------------
function CommandPalette({ open, onClose, onNav, onOpenProject, lang, onLang, onToggleTheme }) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [open]);

  const groups = useMemo(() => {
    const nav = [
      { id: "go-home",    group: "navigate", label: "Home",    kbd: "g h", run: () => onNav("home") },
      { id: "go-work",    group: "navigate", label: "Work",    kbd: "g w", run: () => onNav("work") },
      { id: "go-about",   group: "navigate", label: "About",   kbd: "g a", run: () => onNav("about") },
      { id: "go-writing", group: "navigate", label: "Notes",   kbd: "g n", run: () => onNav("writing") },
      { id: "go-contact", group: "navigate", label: "Contact", kbd: "g c", run: () => onNav("contact") },
    ];
    const projects = (window.PROJECTS || []).map((p) => ({
      id: "p-" + p.slug,
      group: "projects",
      label: p.title,
      hint: p.kind[lang],
      run: () => onOpenProject(p.slug),
    }));
    const links = [
      { id: "l-gh",  group: "links", label: "GitHub · SKYWALKERT1",     hint: "↗", run: () => window.open(window.LINKS.github, "_blank") },
      { id: "l-hf",  group: "links", label: "Hugging Face · SkyWalkertT1", hint: "↗", run: () => window.open(window.LINKS.huggingface, "_blank") },
      { id: "l-li",  group: "links", label: "LinkedIn",                  hint: "↗", run: () => window.open(window.LINKS.linkedin, "_blank") },
      { id: "l-em",  group: "links", label: "Email · " + window.LINKS.email, hint: "↗", run: () => window.open("mailto:" + window.LINKS.email) },
    ];
    const actions = [
      { id: "a-theme", group: "actions", label: "Toggle theme",   kbd: "⇧T", run: onToggleTheme },
      { id: "a-lang-en", group: "actions", label: "Language → EN", kbd: "",   run: () => onLang("en") },
      { id: "a-lang-tr", group: "actions", label: "Language → TR", kbd: "",   run: () => onLang("tr") },
      { id: "a-cv", group: "actions", label: "Open CV (pdf)", kbd: "", run: () => window.open("uploads/furkan_fatih_ciftci_cv.pdf", "_blank") },
    ];
    return [...nav, ...projects, ...links, ...actions];
  }, [lang, onNav, onOpenProject, onLang, onToggleTheme]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return groups;
    return groups.filter((g) => g.label.toLowerCase().includes(term) || g.group.includes(term));
  }, [q, groups]);

  useEffect(() => { setActive(0); }, [q]);

  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setActive((v) => Math.min(v + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp")   { e.preventDefault(); setActive((v) => Math.max(v - 1, 0)); }
      if (e.key === "Enter") {
        e.preventDefault();
        const it = filtered[active];
        if (it) { it.run(); onClose(); }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, active, onClose]);

  if (!open) return null;

  // split into groups, keeping original order
  const byGroup = [];
  const seen = new Map();
  filtered.forEach((it, idx) => {
    if (!seen.has(it.group)) { seen.set(it.group, byGroup.length); byGroup.push({ name: it.group, items: [] }); }
    byGroup[seen.get(it.group)].items.push({ ...it, idx });
  });

  return (
    <div className="cmdk-backdrop" onClick={onClose}>
      <div className="cmdk" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="command palette">
        <div className="cmdk-input">
          <Icon.search />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={lang === "tr" ? "ara veya komut yaz…" : "search or run a command…"}
          />
          <kbd style={{
            fontFamily: "var(--font-mono)", fontSize: 10,
            color: "var(--fg-3)", background: "var(--bg-3)",
            border: "1px solid var(--line)", padding: "1px 5px", borderRadius: 3,
          }}>esc</kbd>
        </div>

        <div className="cmdk-list">
          {byGroup.length === 0 && (
            <div style={{ padding: 24, color: "var(--fg-3)", fontFamily: "var(--font-mono)", fontSize: 12 }}>
              {lang === "tr" ? "sonuç yok" : "no results"}
            </div>
          )}
          {byGroup.map((g) => (
            <div key={g.name}>
              <div className="cmdk-group-h">{g.name}</div>
              {g.items.map((it) => (
                <div
                  key={it.id}
                  className="cmdk-item"
                  data-active={it.idx === active}
                  onMouseEnter={() => setActive(it.idx)}
                  onClick={() => { it.run(); onClose(); }}
                >
                  <span className="ico"><Icon.corner /></span>
                  <span>{it.label}</span>
                  {it.hint && <span className="muted mono" style={{ marginLeft: 8, fontSize: 11 }}>{it.hint}</span>}
                  {it.kbd && <span className="kbd">{it.kbd}</span>}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="cmdk-foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate · <kbd>↵</kbd> open · <kbd>esc</kbd> close</span>
          <span>ffç · cmdk</span>
        </div>
      </div>
    </div>
  );
}

// ------------- Tweaks panel (dev/author toggle — hero background etc) -------------
function TweaksPanel({ visible, onClose, tweaks, setTweaks }) {
  if (!visible) return null;
  const set = (k, v) => setTweaks((t) => ({ ...t, [k]: v }));
  return (
    <div className="tweaks">
      <div className="tweaks-head">
        <span>// tweaks</span>
        <button onClick={onClose} style={{ color: "var(--fg-2)", fontFamily: "var(--font-mono)", fontSize: 11 }}>close</button>
      </div>
      <div className="tweaks-row">
        <span className="lbl">hero bg</span>
        <div className="seg">
          {["attention","tokens","grid"].map((v) => (
            <button key={v} data-active={tweaks.heroBg === v} onClick={() => set("heroBg", v)}>{v}</button>
          ))}
        </div>
      </div>
      <div className="tweaks-row">
        <span className="lbl">density</span>
        <div className="seg">
          {[{k:"cozy",v:1},{k:"compact",v:0.82}].map((o) => (
            <button key={o.k} data-active={tweaks.density === o.v} onClick={() => set("density", o.v)}>{o.k}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ------------- 404 -------------
function NotFound({ t, onNav }) {
  return (
    <main className="page-enter">
      <section className="section">
        <div className="shell">
          <div className="section-num"><span>§ 404</span><span className="dim">/</span><span>void</span></div>
          <h1 className="t-h1" style={{ margin: "0 0 12px" }}>{t.notfound_line_1}</h1>
          <p className="mono-sm muted">{t.notfound_line_2}</p>
          <p className="t-body" style={{ marginTop: 20, color: "var(--fg-1)" }}>{t.notfound_line_3}</p>
          <div style={{ marginTop: 28, display: "flex", gap: 10 }}>
            <button className="btn btn-primary" onClick={() => onNav("home")}>home <Icon.arrow /></button>
            <button className="btn btn-secondary" onClick={() => onNav("work")}>work</button>
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { TopBar, CommandPalette, TweaksPanel, NotFound });
})();

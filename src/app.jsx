/* global React, ReactDOM, window */
(() => {
const { useState, useEffect, useMemo, useCallback } = window.React;

// ------------- hash router -------------
// routes:
//   #/              → home
//   #/work          → home (scrolled to work section)
//   #/work/:slug    → case study
//   #/about         → about
//   #/writing       → home (notes section)
//   #/uses          → about (uses section)
//   #/contact       → home (footer cta)
//   #/404           → not found
function parseHash() {
  const raw = (window.location.hash || "").replace(/^#\/?/, "");
  if (!raw) return { name: "home" };
  const parts = raw.split("/").filter(Boolean);
  const [a, b] = parts;
  if (a === "work" && b)       return { name: "case", slug: b };
  if (a === "work")            return { name: "work" };
  if (a === "about")           return { name: "about" };
  if (a === "uses")            return { name: "uses" };
  if (a === "writing")         return { name: "writing" };
  if (a === "contact")         return { name: "contact" };
  return { name: "404" };
}

function setHash(name, slug) {
  const h =
    name === "home"    ? "#/"
  : name === "case"    ? `#/work/${slug}`
  : `#/${name}`;
  if (window.location.hash !== h) window.location.hash = h;
}

function App() {
  const [route, setRoute]   = useState(parseHash);
  const [theme, setTheme]   = useState(() =>
    document.documentElement.getAttribute("data-theme") ||
    (window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark")
  );
  const [lang, setLang]     = useState(() => {
    const saved = localStorage.getItem("ffç.lang");
    if (saved) return saved;
    return (navigator.language || "en").toLowerCase().startsWith("tr") ? "tr" : "en";
  });
  const [palette, setPalette] = useState(false);
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const [tweaks, setTweaks] = useState(() => {
    try { return JSON.parse(document.getElementById("tweak-config")?.textContent || "{}") || {}; }
    catch { return {}; }
  });
  const mergedTweaks = useMemo(() => ({ heroBg: "attention", density: 1, ...tweaks }), [tweaks]);

  // expose tweaks globally so children can read without prop-drilling
  useEffect(() => {
    window.__tweaks = mergedTweaks;
    document.documentElement.style.setProperty("--density", String(mergedTweaks.density));
  }, [mergedTweaks]);

  // theme + lang persistence
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("ffç.theme", theme);
  }, [theme]);
  useEffect(() => {
    localStorage.setItem("ffç.lang", lang);
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);
  useEffect(() => {
    const saved = localStorage.getItem("ffç.theme");
    if (saved && saved !== theme) setTheme(saved);
    // eslint-disable-next-line
  }, []);

  // hash listener
  useEffect(() => {
    function onHash() {
      setRoute(parseHash());
      window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    }
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // soft-scroll helpers for section-targeted nav
  useEffect(() => {
    if (route.name === "writing") scrollToSection(".writing-list");
    if (route.name === "work")    scrollToSection(".cards");
    if (route.name === "contact") scrollToSection(".footer-cta");
    if (route.name === "uses")    scrollToSection(".two-col");
  }, [route]);

  function scrollToSection(sel) {
    setTimeout(() => {
      const el = document.querySelector(sel);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 30);
  }

  // keyboard: /, cmd+k, g+{h,w,a,n,c}, shift+T
  useEffect(() => {
    let gPending = false;
    let gTimer = null;
    function onKey(e) {
      const tag = (e.target?.tagName || "").toLowerCase();
      const typing = tag === "input" || tag === "textarea" || e.target?.isContentEditable;

      // palette
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault(); setPalette(true); return;
      }
      if (!typing && e.key === "/") { e.preventDefault(); setPalette(true); return; }

      // theme
      if (!typing && e.shiftKey && (e.key === "T" || e.key === "t")) {
        e.preventDefault();
        setTheme((th) => th === "dark" ? "light" : "dark");
        return;
      }

      // tweaks
      if (!typing && e.shiftKey && (e.key === "D" || e.key === "d")) {
        e.preventDefault();
        setTweaksOpen((v) => !v);
        return;
      }

      // g + letter
      if (!typing && (e.key === "g" || e.key === "G")) {
        gPending = true;
        clearTimeout(gTimer);
        gTimer = setTimeout(() => { gPending = false; }, 900);
        return;
      }
      if (!typing && gPending) {
        const k = e.key.toLowerCase();
        const map = { h: "home", w: "work", a: "about", n: "writing", c: "contact", u: "uses" };
        if (map[k]) {
          e.preventDefault();
          gPending = false; clearTimeout(gTimer);
          onNav(map[k]);
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); clearTimeout(gTimer); };
  }, []);

  const onNav = useCallback((name) => setHash(name), []);
  const onOpenProject = useCallback((slug) => setHash("case", slug), []);

  const t = window.I18N[lang];

  let page;
  if (route.name === "404")               page = <NotFound t={t} onNav={onNav} />;
  else if (route.name === "about")        page = <About t={t} lang={lang} onNav={onNav} />;
  else if (route.name === "uses")         page = <About t={t} lang={lang} onNav={onNav} />;
  else if (route.name === "case")         page = <CaseStudy t={t} lang={lang} slug={route.slug} onNav={onNav} onOpenProject={onOpenProject} />;
  else                                    page = <Home t={t} lang={lang} onNav={onNav} onOpenProject={onOpenProject} />;

  return (
    <>
      <TopBar
        route={route}
        onNav={onNav}
        theme={theme}
        onToggleTheme={() => setTheme((th) => th === "dark" ? "light" : "dark")}
        lang={lang}
        onLang={setLang}
        onOpenPalette={() => setPalette(true)}
      />
      {page}
      <CommandPalette
        open={palette}
        onClose={() => setPalette(false)}
        onNav={onNav}
        onOpenProject={onOpenProject}
        lang={lang}
        onLang={setLang}
        onToggleTheme={() => setTheme((th) => th === "dark" ? "light" : "dark")}
      />
      <TweaksPanel
        visible={tweaksOpen}
        onClose={() => setTweaksOpen(false)}
        tweaks={mergedTweaks}
        setTweaks={setTweaks}
      />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
})();

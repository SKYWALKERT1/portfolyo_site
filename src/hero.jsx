/* global React, window */
(() => {
const { useEffect, useRef, useState, useMemo } = window.React;

// -------- Attention matrix (calm, slow diffusion) --------
function AttentionMatrix({ size = 16, seed = 1 }) {
  const [tick, setTick] = useState(0);
  const cellsRef = useRef(null);

  // deterministic pseudo-random
  function rand(i) {
    const x = Math.sin((i + 1) * 127.1 + seed * 311.7) * 43758.5453;
    return x - Math.floor(x);
  }

  const baseWeights = useMemo(() => {
    const arr = new Array(size * size).fill(0);
    // cluster around a couple of "attention heads"
    const heads = [
      { cx: size * 0.3, cy: size * 0.4, r: size * 0.3 },
      { cx: size * 0.7, cy: size * 0.7, r: size * 0.22 },
      { cx: size * 0.5, cy: size * 0.15, r: size * 0.18 },
    ];
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        let w = 0;
        for (const h of heads) {
          const d = Math.hypot(x - h.cx, y - h.cy);
          w += Math.max(0, 1 - d / h.r) * (0.6 + 0.4 * rand(x * 31 + y * 7));
        }
        // diagonal prior
        w += Math.max(0, 1 - Math.abs(x - y) / (size * 0.4)) * 0.2;
        arr[y * size + x] = Math.min(1, w);
      }
    }
    return arr;
  }, [size, seed]);

  useEffect(() => {
    let raf;
    let last = 0;
    function step(t) {
      if (t - last > 900) {
        last = t;
        setTick((v) => v + 1);
      }
      raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const cells = useMemo(() => {
    const n = size * size;
    const out = [];
    for (let i = 0; i < n; i++) {
      const base = baseWeights[i];
      // subtle flicker for a few cells
      const jitter = ((Math.sin((tick + i * 0.37) * 0.8) + 1) / 2) * 0.25;
      const w = Math.max(0, Math.min(1, base * (0.7 + jitter * 0.4)));
      out.push(w);
    }
    return out;
  }, [baseWeights, tick, size]);

  return (
    <>
      <div
        ref={cellsRef}
        className="attn-matrix"
        style={{
          gridTemplateColumns: `repeat(${size}, 1fr)`,
          gridTemplateRows: `repeat(${size}, 1fr)`,
        }}
      >
        {cells.map((w, i) => (
          <div key={i} className="attn-cell" style={{ "--w": w.toFixed(3) }} />
        ))}
      </div>
      <div className="attn-axis x mono">
        <span>t₀</span><span>t₄</span><span>t₈</span><span>t₁₂</span><span>t₁₅</span>
      </div>
      <div className="attn-axis y mono">
        <span>q₀</span><span>q₄</span><span>q₈</span><span>q₁₂</span><span>q₁₅</span>
      </div>
      <div className="attn-legend">
        <span>self-attention · layer 6 · head 3</span>
        <span className="rail" />
        <span>0 → 1</span>
      </div>
    </>
  );
}

// -------- Token stream variant --------
function TokenStream() {
  const lines = [
    ["loading", "tokens", "→", "∥hypr.context∥", "::", "recall", "top_5"],
    ["embed", "query", "bge-small-en-v1.5", "·", "dim=384"],
    ["rerank", "cross-encoder", "MiniLM-L-6-v2"],
    ["ctx", "=", "∑", "(vec_sim", "·", "recency_decay(t))"],
    ["ship", "it", "→", "p95=180ms", "✓"],
  ];
  const hot = new Set(["query", "ship", "it", "✓", "p95=180ms"]);
  return (
    <div className="tokenstream">
      {Array.from({ length: 22 }).map((_, r) => {
        const src = lines[r % lines.length];
        return (
          <div className="row" key={r}>
            {Array.from({ length: 3 }).map((_, rep) =>
              src.map((t, i) => {
                const key = `${r}-${rep}-${i}`;
                if (hot.has(t)) return <span key={key} className="tok-hot">{t} </span>;
                if (i < 2) return <span key={key} className="tok-warm">{t} </span>;
                return <span key={key}>{t} </span>;
              })
            )}
          </div>
        );
      })}
    </div>
  );
}

// -------- Hero --------
function Hero({ t, onNav, heroBg }) {
  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden />
      <div className="shell">
        <div className="hero-grid">
          <div className="hero-text">
            <div className="hero-eyebrow">
              <span className="status-dot" />
              <span>{t.hero_eyebrow}</span>
              <span className="sep-dot" aria-hidden>·</span>
              <div className="hero-meta">
                {t.hero_meta.map((m, i) => (
                  <span key={i} className="hm-chip">
                    <span className="hm-k">{m.k}</span>
                    <span className="hm-v">{m.v}</span>
                  </span>
                ))}
              </div>
            </div>

            <h1 className="t-display hero-title">
              <span className="line">{t.hero_line_1}</span>
              <span className="line">
                <span className="underline-accent">{t.hero_line_2.replace(/,$/, "")}</span>,
              </span>
              <span className="line">
                <span className="muted">{t.hero_line_3_pre} </span>
                <span className="accent-word">{t.hero_line_3_accent}</span>
              </span>
            </h1>

            <p className="hero-lede t-body-lg">{t.hero_lede}</p>

            <div className="hero-cta">
              <button className="btn btn-primary" onClick={() => onNav("work")}>
                {t.cta_primary} <Icon.arrow />
              </button>
              <button className="btn btn-secondary" onClick={() => onNav("contact")}>
                {t.cta_secondary}
              </button>
              <a className="btn btn-ghost hero-cv" href="uploads/furkan_fatih_ciftci_cv.pdf" target="_blank" rel="noreferrer">
                <Icon.page /> cv.pdf
              </a>
            </div>

            {/* trust bar */}
            <div className="trust-bar">
              {t.hero_trust.map((b, i) => (
                <span className="tb-item" key={i}>
                  <span className="tb-k mono">{b.k}</span>
                  <span className="tb-v">{b.v}</span>
                </span>
              ))}
            </div>

            {/* now — terminal-style */}
            <div className="now-term">
              <div className="nt-head mono">
                <span className="nt-dot" /> <span className="nt-label">now</span>
                <span className="nt-sep">·</span>
                <span className="nt-host">furkan@edge</span>
                <span className="nt-branch">main</span>
              </div>
              <div className="nt-body mono">
                <div className="nt-line"><span className="nt-prompt">$</span> {t.now_text}<span className="nt-caret" /></div>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-visual">
              <div className="hv-chrome">
                <div className="dots"><i /><i /><i /></div>
                <div className="path">
                  ~/<b>hyprcontext</b>/attention_viz.py
                </div>
                <div className="hv-meta">
                  <span className="hv-live"><i /> live</span>
                  <span>layer 6 · head 3</span>
                </div>
              </div>
              <div className="hv-canvas">
                {heroBg === "attention" && <AttentionMatrix size={16} />}
                {heroBg === "tokens" && <TokenStream />}
                {heroBg === "grid" && <div style={{
                  position: "absolute", inset: 0,
                  backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
                  backgroundSize: "18px 18px"
                }} />}
                <div className="hv-overlay">
                  <span className="mono-sm"><span className="dim">recall@5</span> <b>0.84</b></span>
                  <span className="mono-sm"><span className="dim">p95</span> <b>180ms</b></span>
                  <span className="mono-sm"><span className="dim">params</span> <b>22M</b></span>
                </div>
              </div>
              <div className="hv-foot mono-sm">
                <span>attention_viz.py</span>
                <span className="dim">running · cross-encoder · MiniLM-L-6-v2</span>
              </div>
            </div>

            <div className="mini-card mc-train">
              <div className="mc-head mono">
                <span className="mc-tag mc-tag-train">train</span>
                <span className="mc-title">{t.hv_train_title}</span>
                <a className="mc-link mono-sm" href={window.LINKS.huggingface} target="_blank" rel="noreferrer">🤗 ↗</a>
              </div>
              <div className="mc-body mono-sm">
                {t.hv_train_lines.map((l, i) => (
                  <div key={i} className={i === 2 ? "ep best" : i === 3 ? "push" : "ep"}>{l}</div>
                ))}
              </div>
            </div>

            <div className="mini-card mc-lat">
              <div className="mc-head mono">
                <span className="mc-tag mc-tag-perf">perf</span>
                <span className="mc-title">{t.hv_latency_title}</span>
                <span className="mc-link mono-sm dim">{t.hv_latency_note}</span>
              </div>
              <div className="lat-rows">
                {[
                  { d: "Pixel 7",    v: 168, p: 56 },
                  { d: "Galaxy S21", v: 155, p: 52, best: true },
                  { d: "Pixel 6",    v: 210, p: 70 },
                  { d: "Mi 11",      v: 180, p: 60 },
                ].map((r) => (
                  <div className="lat-row" key={r.d}>
                    <span className="lat-dev mono-sm">{r.d}</span>
                    <div className="lat-bar"><i style={{ width: r.p + "%" }} data-best={r.best || undefined} /></div>
                    <span className="lat-val mono-sm">{r.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hero-scroll mono-sm" aria-hidden>
          <span>{t.hero_scroll}</span>
          <span className="hs-line" />
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Hero, AttentionMatrix, TokenStream });
})();

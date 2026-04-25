/* global React, window */
(() => {
const { useEffect, useState } = window.React;

function MousyCard({ project, onOpen, t, lang }) {
  const [mx, setMx] = useState(50);
  return (
    <button
      className="cs-card"
      style={{ "--mx": mx + "%" }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setMx(Math.round(((e.clientX - r.left) / r.width) * 100));
      }}
      onClick={() => onOpen(project.slug)}
    >
      <div className="cs-head">
        <span className="cs-num mono">§ {project.num}</span>
        <span className="cs-kind">{project.kind[lang]}</span>
      </div>
      <div className="cs-title">{project.title}</div>
      <div className="cs-sum">{project.summary[lang]}</div>
      <div className="cs-metrics">
        {project.metrics.map((m) => (
          <MetricBadge key={m.k} k={m.k} v={m.v} />
        ))}
      </div>
      <div className="cs-chips">
        {project.chips.map((c) => <Chip key={c}>{c}</Chip>)}
      </div>
    </button>
  );
}

function Home({ t, lang, onNav, onOpenProject }) {
  const tl = TIMELINE[lang].slice(0, 3);
  return (
    <main className="page-enter">
      <Hero t={t} onNav={onNav} heroBg={window.__tweaks?.heroBg || "attention"} />

      {/* Numbers ribbon */}
      <section className="numbers-ribbon">
        <div className="shell">
          <div className="nr-head mono-sm muted">{t.sec_numbers} · <span className="dim">{t.sec_numbers_sub}</span></div>
          <div className="nr-grid">
            {STATS.map((s, i) => (
              <div className="nr-cell" key={i}>
                <div className="n mono">{s.n}</div>
                <div className="k mono-sm">{s.k[lang]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured work */}
      <section className="section">
        <div className="shell">
          <div className="section-num">
            <span>§ 01</span><span className="dim">/</span><span>{t.sec_work}</span>
            <span style={{ marginLeft: "auto" }} className="muted">{t.sec_work_sub}</span>
          </div>
          <div className="cards">
            {PROJECTS.map((p) => (
              <MousyCard key={p.slug} project={p} onOpen={onOpenProject} t={t} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section">
        <div className="shell">
          <div className="section-num">
            <span>§ 02</span><span className="dim">/</span><span>{t.sec_caps}</span>
            <span style={{ marginLeft: "auto" }} className="muted">{t.sec_caps_sub}</span>
          </div>
          <div className="caps">
            {t.caps.map((c) => (
              <div className="cap" key={c.n}>
                <div className="num mono">{c.n}</div>
                <div className="h">{c.h}</div>
                <div className="d">{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How I ship — pipeline */}
      <section className="section">
        <div className="shell">
          <div className="section-num">
            <span>§ 03</span><span className="dim">/</span><span>{t.sec_process}</span>
            <span style={{ marginLeft: "auto" }} className="muted">{t.sec_process_sub}</span>
          </div>
          <div className="pipeline">
            {t.process.map((p, i) => (
              <div className="pipe-step" key={p.n}>
                <div className="pipe-num mono">{p.n}</div>
                <div className="pipe-h">{p.h}</div>
                <div className="pipe-d">{p.d}</div>
                {i < t.process.length - 1 && <div className="pipe-arrow" aria-hidden><Icon.arrow /></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack strip */}
      <section style={{ padding: 0 }}>
        <div className="shell" style={{ padding: "40px 32px 12px" }}>
          <div className="section-num">
            <span>§ 04</span><span className="dim">/</span><span>{t.stack_label.replace("// ","")}</span>
          </div>
        </div>
        <div className="stack-strip">
          <div className="track">
            {[...STACK_ITEMS, ...STACK_ITEMS].map((s, i) => (
              <span key={i}>{s}<span className="d" /></span>
            ))}
          </div>
        </div>
      </section>

      {/* Lab bench / changelog */}
      <section className="section">
        <div className="shell">
          <div className="section-num">
            <span>§ 05</span><span className="dim">/</span><span>{t.sec_lab}</span>
            <span style={{ marginLeft: "auto" }} className="muted">{t.sec_lab_sub}</span>
          </div>
          <div className="changelog">
            <div className="cl-head mono-sm muted">
              <span>date</span><span>repo</span><span>message</span><span>tag</span>
            </div>
            {CHANGELOG.map((c, i) => (
              <div className="cl-row" key={i}>
                <span className="mono cl-date">{c.d}</span>
                <span className="mono cl-repo">{c.repo}</span>
                <span className="cl-msg">{c.msg[lang]}</span>
                <span className={`cl-tag cl-tag-${c.tag}`}>{c.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Writing */}
      <section className="section">
        <div className="shell">
          <div className="section-num">
            <span>§ 06</span><span className="dim">/</span><span>{t.sec_writing}</span>
            <span style={{ marginLeft: "auto" }} className="muted">{t.sec_writing_sub}</span>
          </div>
          <div className="writing-list">
            {NOTES.map((n) => (
              <div key={n.slug} className="writing-row" onClick={() => onNav("writing")}>
                <div className="date">{n.date}</div>
                <div className="title">
                  {n.title[lang]}
                  <span className="tag">{n.tag[lang]}</span>
                </div>
                <div className="read">{n.read} →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline preview */}
      <section className="section">
        <div className="shell">
          <div className="section-num">
            <span>§ 07</span><span className="dim">/</span><span>{t.sec_tl}</span>
            <span style={{ marginLeft: "auto" }} className="muted">{t.sec_tl_sub}</span>
          </div>
          <div className="tl-preview">
            {tl.map((row, i) => (
              <div className="tlp-row" key={i}>
                <div className="tlp-yr mono">{row.yr}</div>
                <div className="tlp-body">
                  <div className="tlp-role">{row.role}</div>
                  <div className="tlp-blurb">{row.blurb}</div>
                </div>
                <div className="tlp-place mono-sm muted">{row.place}</div>
              </div>
            ))}
            <button className="tlp-more" onClick={() => onNav("about")}>{t.tl_more}</button>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="footer-cta">
        <div className="glow" />
        <div className="shell">
          <div className="section-num">
            <span>§ 08</span><span className="dim">/</span><span>contact</span>
          </div>
          <h2>
            {t.footer_h_pre}<br />
            <span className="accent">{t.footer_h_accent}</span>
          </h2>
          <p className="sub" style={{ maxWidth: 560 }}>{t.footer_sub}</p>

          <div className="links">
            <a className="link-row" href={`mailto:${LINKS.email}`}>
              <div>
                <div className="k">email</div>
                <div className="v">{LINKS.email}</div>
              </div>
              <Icon.arrowUp className="arrow" />
            </a>
            <a className="link-row" href={LINKS.github} target="_blank" rel="noreferrer">
              <div>
                <div className="k">github</div>
                <div className="v">/SKYWALKERT1</div>
              </div>
              <Icon.ext className="arrow" />
            </a>
            <a className="link-row" href={LINKS.linkedin} target="_blank" rel="noreferrer">
              <div>
                <div className="k">linkedin</div>
                <div className="v">/furkan-fatih-ciftci</div>
              </div>
              <Icon.ext className="arrow" />
            </a>
            <a className="link-row" href={LINKS.huggingface} target="_blank" rel="noreferrer">
              <div>
                <div className="k">huggingface</div>
                <div className="v">/SkyWalkertT1</div>
              </div>
              <Icon.ext className="arrow" />
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="shell spread" style={{ width: "100%" }}>
          <div>
            <span className="accent" style={{ color: "var(--accent)" }}>●</span> built 2026 · furkan fatih çiftçi
          </div>
          <div>react 18 · babel standalone · hand-rolled css · press <kbd style={{fontFamily:"var(--font-mono)",fontSize:10,padding:"1px 5px",border:"1px solid var(--line)",borderRadius:3,color:"var(--fg-1)",background:"var(--bg-2)"}}>/</kbd> to search</div>
        </div>
      </footer>
    </main>
  );
}

Object.assign(window, { Home });
})();

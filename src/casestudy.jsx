/* global React, window */
(() => {

// ------------- Retrieval chart (SVG) -------------
function RetrievalChart({ rows }) {
  const W = 560, H = 220, pad = { l: 40, r: 16, t: 18, b: 34 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const maxY = 1;
  const n = rows.length;
  const x = (i) => pad.l + (innerW * (i + 0.5)) / n;
  const y = (v) => pad.t + innerH * (1 - v / maxY);

  const series = [
    { key: "r1",  label: "recall@1",  color: "var(--c1)" },
    { key: "r5",  label: "recall@5",  color: "var(--accent)" },
  ];

  return (
    <div className="chart-wrap">
      <div className="legend">
        {series.map((s) => (
          <span key={s.key}><i style={{ background: s.color }} />{s.label}</span>
        ))}
        <span style={{ marginLeft: "auto" }}>n={n} configs · higher is better</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="recall across retrieval configurations">
        {/* grid */}
        {[0, 0.25, 0.5, 0.75, 1].map((g, i) => (
          <g key={i}>
            <line
              x1={pad.l} x2={W - pad.r}
              y1={y(g)} y2={y(g)}
              stroke="var(--line)"
              strokeDasharray={g === 0 ? "" : "2 4"}
            />
            <text x={pad.l - 8} y={y(g) + 3} textAnchor="end"
              fontFamily="var(--font-mono)" fontSize="9" fill="var(--fg-3)">{g.toFixed(2)}</text>
          </g>
        ))}
        {/* bars */}
        {rows.map((r, i) => {
          const w = (innerW / n) * 0.25;
          return (
            <g key={i}>
              <rect x={x(i) - w - 2} y={y(parseFloat(r.r1))} width={w} height={y(0) - y(parseFloat(r.r1))}
                fill="var(--c1)" opacity="0.85" rx="2" />
              <rect x={x(i) + 2} y={y(parseFloat(r.r5))} width={w} height={y(0) - y(parseFloat(r.r5))}
                fill="var(--accent)" rx="2" />
              <text x={x(i)} y={H - 14} textAnchor="middle"
                fontFamily="var(--font-mono)" fontSize="9" fill={r.best ? "var(--accent)" : "var(--fg-2)"}>
                {`c${i + 1}`}
              </text>
              <text x={x(i)} y={H - 3} textAnchor="middle"
                fontFamily="var(--font-mono)" fontSize="8" fill="var(--fg-3)">
                {r.p95}ms
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ------------- Architecture diagram (SVG) -------------
function ArchDiagram() {
  return (
    <div className="diagram">
      <div className="diagram-title">
        <span>// architecture — query path</span>
        <span>p95 &lt; 200ms</span>
      </div>
      <svg viewBox="0 0 640 240" role="img" aria-label="HyprContext architecture">
        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="var(--fg-3)" />
          </marker>
        </defs>
        {[
          { x: 10,  y: 90,  w: 110, h: 60, t: "query", s: "user turn" },
          { x: 150, y: 40,  w: 130, h: 60, t: "bge-small", s: "dense vec · 384d" },
          { x: 150, y: 140, w: 130, h: 60, t: "BM25", s: "sparse keyword" },
          { x: 310, y: 90,  w: 120, h: 60, t: "hybrid fuse", s: "+ recency decay" },
          { x: 460, y: 90,  w: 170, h: 60, t: "cross-encoder rerank", s: "MiniLM-L-6 · top-20 → 5" },
        ].map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="8"
              fill="var(--bg-2)" stroke={i === 4 ? "var(--accent)" : "var(--line-strong)"} />
            <text x={b.x + 10} y={b.y + 24} fontFamily="var(--font-mono)" fontSize="12" fill="var(--fg-0)">{b.t}</text>
            <text x={b.x + 10} y={b.y + 42} fontFamily="var(--font-mono)" fontSize="10" fill="var(--fg-2)">{b.s}</text>
          </g>
        ))}
        {/* arrows */}
        <path d="M120 110 L150 70"  stroke="var(--fg-3)" fill="none" markerEnd="url(#arr)" />
        <path d="M120 130 L150 170" stroke="var(--fg-3)" fill="none" markerEnd="url(#arr)" />
        <path d="M280 70  L310 110" stroke="var(--fg-3)" fill="none" markerEnd="url(#arr)" />
        <path d="M280 170 L310 130" stroke="var(--fg-3)" fill="none" markerEnd="url(#arr)" />
        <path d="M430 120 L460 120" stroke="var(--fg-3)" fill="none" markerEnd="url(#arr)" />
      </svg>
    </div>
  );
}

// ------------- Detail renderer -------------
function HyprContextDetail({ t, lang, project }) {
  const d = window.HYPRCONTEXT_DETAIL[lang];
  return (
    <>
      <div className="tldr">
        <div className="tldr-bar">{t.cs_tldr}</div>
        <div className="tldr-grid">
          <div className="tldr-cell"><div className="k">{t.cs_problem}</div><div className="v">{d.tldr.problem}</div></div>
          <div className="tldr-cell"><div className="k">{t.cs_approach}</div><div className="v">{d.tldr.approach}</div></div>
          <div className="tldr-cell"><div className="k">{t.cs_result}</div><div className="v">{d.tldr.result}</div></div>
        </div>
        <div className="tldr-metrics">
          {project.metrics.map((m) => <MetricBadge key={m.k} k={m.k} v={m.v} />)}
        </div>
      </div>

      <div className="two-col">
        <div className="prose">
          <h3>{t.cs_context}</h3>
          <p>{d.context}</p>
          <h3>{t.cs_data}</h3>
          <p>{d.data}</p>
        </div>
        <ArchDiagram />
      </div>

      <div className="section-num" style={{ marginTop: 24 }}>
        <span>{t.cs_exp}</span>
      </div>
      <RetrievalChart rows={d.experiments} />
      <table className="datatable">
        <thead>
          <tr>
            <th>config</th>
            <th className="num">recall@1</th>
            <th className="num">recall@5</th>
            <th className="num">p95 (ms)</th>
            <th>note</th>
          </tr>
        </thead>
        <tbody>
          {d.experiments.map((r, i) => (
            <tr key={i} className={r.best ? "best" : ""}>
              <td>{r.row}</td>
              <td className="num">{r.r1}</td>
              <td className="num">{r.r5}</td>
              <td className="num">{r.p95}</td>
              <td>{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="two-col">
        <div className="prose">
          <h3>{t.cs_arch}</h3>
          <Code lang="python">
{`# hypr/retrieve.py
from hypr.embed import BGE
from hypr.bm25  import BM25
from hypr.rerank import CrossEncoder

bge  = BGE("bge-small-en-v1.5")
bm25 = BM25(index="memories")
rer  = CrossEncoder("ms-marco-MiniLM-L-6-v2")

def recall(query: str, k: int = 5):
    dense  = bge.search(query, k=20)
    sparse = bm25.search(query, k=20)
    fused  = hybrid_fuse(dense, sparse, recency_decay=0.08)
    return rer.rerank(query, fused, top_k=k)`}
          </Code>
          <Callout tag={lang === "tr" ? "karar" : "decision"}>
            {lang === "tr"
              ? "LLM rerank iki kat daha pahalı, sadece +0.01 kazanç. Production'a almadık."
              : "LLM rerank costs 2× latency for +0.01 recall. Not worth shipping."}
          </Callout>
        </div>
        <div className="prose">
          <h3>{t.cs_deploy}</h3>
          <p>{d.deploy}</p>
          <Code lang="bash">
{`# spin up locally
git clone github.com/SKYWALKERT1/hyprcontext
cd hyprcontext && docker compose up
curl -s localhost:8080/recall \\
  -d '{"q":"what did we decide about BM25?"}'`}
          </Code>
        </div>
      </div>

      <div className="prose">
        <h3>{t.cs_learn}</h3>
        <ul>{d.learnings.map((l, i) => <li key={i}>{l}</li>)}</ul>
      </div>
    </>
  );
}

// Generic model-card style fallback for other slugs
function GenericDetail({ t, lang, project }) {
  const isBertLike = /bert/i.test(project.slug);
  return (
    <>
      <div className="tldr">
        <div className="tldr-bar">{t.cs_tldr}</div>
        <div className="tldr-grid">
          <div className="tldr-cell">
            <div className="k">{t.cs_problem}</div>
            <div className="v">
              {isBertLike
                ? (lang === "tr"
                    ? "Türkçe finans metinlerinde mevcut sentiment modelleri domain'e kör — genel Türkçe corpus üzerinde eğitilmişler."
                    : "Off-the-shelf Turkish sentiment models miss domain nuance — they were trained on generic corpora.")
                : project.summary[lang]}
            </div>
          </div>
          <div className="tldr-cell">
            <div className="k">{t.cs_approach}</div>
            <div className="v">
              {isBertLike
                ? (lang === "tr"
                    ? "dbmdz/bert-base-turkish-cased üzerine 5.46k el-etiketli finans başlığıyla fine-tune. 3-class sentiment, class-balanced sampling, early-stopping."
                    : "Fine-tune dbmdz/bert-base-turkish-cased on 5.46k hand-labeled finance headlines. 3-class sentiment, class-balanced sampling, early-stopping.")
                : (lang === "tr"
                    ? "On-device pipeline: YOLOv8-seg (int8) garment mask → diffusion prior küçük bir UNet → Flutter tarafında GPU delegate."
                    : "On-device pipeline: YOLOv8-seg (int8) garment mask → small diffusion prior UNet → GPU delegate on the Flutter side.")}
            </div>
          </div>
          <div className="tldr-cell">
            <div className="k">{t.cs_result}</div>
            <div className="v">
              {project.metrics.map((m) => `${m.k} ${m.v}`).join(" · ")}
            </div>
          </div>
        </div>
        <div className="tldr-metrics">
          {project.metrics.map((m) => <MetricBadge key={m.k} k={m.k} v={m.v} />)}
        </div>
      </div>

      <div className="two-col">
        <div className="prose">
          <h3>{t.cs_context}</h3>
          <p>
            {isBertLike
              ? (lang === "tr"
                  ? "Türkçe finans NLP için açık veri seti bulunmuyor — varsa da ya çok küçük ya genel. Borsa başlıklarını kendi elimle tarayıp etiketledim."
                  : "There's no open Turkish finance-NLP corpus worth the name — too small or too generic. I scraped and labeled market headlines by hand.")
              : (lang === "tr"
                  ? "Mobil cihazda offline çalışan bir virtual try-on istedim — kullanıcının fotoğrafı cihazdan çıkmasın, gecikme <100ms kalsın."
                  : "I wanted a try-on experience that runs fully offline — user photo never leaves the device, latency under 100ms.")}
          </p>
          <h3>{t.cs_data}</h3>
          <p>
            {isBertLike
              ? (lang === "tr"
                  ? "5.46k başlık, 3 sınıf (yükseliş / düşüş / nötr). 80/10/10 split, sınıflar eşitlenerek. Gold etiketler ikinci bir turda gözden geçirildi."
                  : "5.46k headlines across 3 classes (bullish / bearish / neutral). 80/10/10 split with class-balanced sampling. Gold labels reviewed in a second pass.")
              : (lang === "tr"
                  ? "Deepfashion + iç veri karışımı · 12k pose-normalize edilmiş üst-beden imgesi. mIoU, FPS ve APK büyüklüğü ana metrikler."
                  : "Mix of Deepfashion + in-house · 12k pose-normalized upper-body images. mIoU, FPS, and APK size as the headline metrics.")}
          </p>
        </div>

        <div className="diagram">
          <div className="diagram-title">
            <span>// stack</span>
            <a href={project.repo} target="_blank" rel="noreferrer">repo ↗</a>
          </div>
          <div style={{ display: "grid", gap: 8 }}>
            {project.stack.map((s) => (
              <div key={s} style={{
                fontFamily: "var(--font-mono)", fontSize: 12,
                padding: "8px 10px", borderRadius: 6,
                background: "var(--bg-2)", border: "1px solid var(--line)",
                color: "var(--fg-1)",
              }}>{s}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="prose">
        <h3>{t.cs_learn}</h3>
        <ul>
          {isBertLike ? (
            <>
              <li>{lang === "tr" ? "Domain-specific veri 50k genel örneği yener. Her seferinde." : "Domain data beats 50k generic samples. Every time."}</li>
              <li>{lang === "tr" ? "Türkçe'de tokenizasyon vocab'ı önemli — cased model büyük fark." : "Turkish tokenization matters — the cased variant helps a lot."}</li>
              <li>{lang === "tr" ? "Sınıf dengesizliği F1'i aldatır. Class weight + stratified split şart." : "Class imbalance lies to you via accuracy. Class weights + stratified split are non-negotiable."}</li>
            </>
          ) : (
            <>
              <li>{lang === "tr" ? "int8 YOLOv8, fp16'ya göre %2 mIoU kaybıyla 3× hız." : "int8 YOLOv8 costs 2 pts mIoU vs fp16 but buys 3× the speed."}</li>
              <li>{lang === "tr" ? "Dart FFI + GPU delegate, full-TFLite stack'tan daha hafif." : "Dart FFI + a native GPU delegate beats a pure TFLite build for size."}</li>
              <li>{lang === "tr" ? "FPS 14 hedefi gerçekçi — bundan altı kullanıcıya kötü hissettiriyor." : "14 FPS is the realistic floor — below that the UI feels broken."}</li>
            </>
          )}
        </ul>
      </div>
    </>
  );
}

function CaseStudy({ t, lang, slug, onNav, onOpenProject }) {
  const project = window.PROJECTS.find((p) => p.slug === slug);
  if (!project) return <NotFound t={t} onNav={onNav} />;
  const isHypr = slug === "hyprcontext";

  const others = window.PROJECTS.filter((p) => p.slug !== slug);

  return (
    <main className="page-enter">
      <section className="cs-hero">
        <div className="shell">
          <div className="breadcrumb">
            <button onClick={() => onNav("work")} style={{ color: "var(--fg-2)" }}>{t.cs_back}</button>
            <span className="sep">/</span>
            <span className="here">{project.title}</span>
          </div>

          <div className="cs-title-row">
            <div>
              <div className="mono-sm muted" style={{ marginBottom: 8 }}>§ {project.num} · {project.kind[lang]}</div>
              <h1>{project.title}</h1>
              <p className="sub t-body-lg">{project.summary[lang]}</p>
            </div>
            <div>
              <div className="cs-chips" style={{ justifyContent: "flex-end" }}>
                {project.chips.map((c) => <Chip key={c}>{c}</Chip>)}
              </div>
              <div style={{ marginTop: 14, display: "flex", gap: 8, justifyContent: "flex-end" }}>
                <a className="btn btn-secondary" href={project.repo} target="_blank" rel="noreferrer">
                  <Icon.ext /> {lang === "tr" ? "repo / model" : "repo / model"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0, borderTop: 0 }}>
        <div className="shell">
          {isHypr
            ? <HyprContextDetail t={t} lang={lang} project={project} />
            : <GenericDetail t={t} lang={lang} project={project} />}
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-num">
            <span>{lang === "tr" ? "sonraki" : "next"}</span>
            <span className="dim">/</span>
            <span>{lang === "tr" ? "diğer projeler" : "other work"}</span>
          </div>
          <div className="cards">
            {others.map((p) => (
              <button key={p.slug} className="cs-card" onClick={() => onOpenProject(p.slug)}>
                <div className="cs-head">
                  <span className="cs-num mono">§ {p.num}</span>
                  <span className="cs-kind">{p.kind[lang]}</span>
                </div>
                <div className="cs-title">{p.title}</div>
                <div className="cs-sum">{p.summary[lang]}</div>
                <div className="cs-metrics">
                  {p.metrics.map((m) => <MetricBadge key={m.k} k={m.k} v={m.v} />)}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { CaseStudy });
})();

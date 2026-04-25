/* global React, window */
(() => {

function About({ t, lang, onNav }) {
  const tl = window.TIMELINE[lang];

  return (
    <main className="page-enter about">
      <section className="section">
        <div className="shell">
          <div className="section-num">
            <span>§ 01</span><span className="dim">/</span><span>{window.I18N[lang].nav_about}</span>
          </div>

          <div className="about-grid">
            <div>
              <h1>{t.about_h}</h1>
              <div className="prose">
                <p>{t.about_p1}</p>
                <p>{t.about_p2}</p>
                <p>{t.about_p3}</p>
              </div>

              <div className="timeline">
                <h3>{lang === "tr" ? "// zaman çizelgesi" : "// timeline"}</h3>
                {tl.map((row, i) => (
                  <div className="tl-row" key={i}>
                    <div className="yr">{row.yr}</div>
                    <div>
                      <div className="role">{row.role}</div>
                      <div className="place">{row.place}</div>
                      <div className="blurb">{row.blurb}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside>
              <div className="sidekv">
                <div className="row">
                  <div className="k">{lang === "tr" ? "konum" : "based"}</div>
                  <div className="v">İzmir · TR</div>
                </div>
                <div className="row">
                  <div className="k">{lang === "tr" ? "odak" : "focus"}</div>
                  <div className="v">{lang === "tr" ? "mobil + uygulamalı ML" : "mobile + applied ML"}</div>
                </div>
                <div className="row">
                  <div className="k">{lang === "tr" ? "durum" : "status"}</div>
                  <div className="v"><span style={{ color: "var(--ok)" }}>●</span> {lang === "tr" ? "2026 yaz stajına açık" : "open · Summer 2026 internships"}</div>
                </div>
                <div className="row">
                  <div className="k">email</div>
                  <div className="v"><a href={`mailto:${window.LINKS.email}`}>{window.LINKS.email}</a></div>
                </div>
                <div className="row">
                  <div className="k">github</div>
                  <div className="v"><a href={window.LINKS.github} target="_blank" rel="noreferrer">/SKYWALKERT1</a></div>
                </div>
                <div className="row">
                  <div className="k">hf</div>
                  <div className="v"><a href={window.LINKS.huggingface} target="_blank" rel="noreferrer">/SkyWalkertT1</a></div>
                </div>
                <div className="row">
                  <div className="k">linkedin</div>
                  <div className="v"><a href={window.LINKS.linkedin} target="_blank" rel="noreferrer">/furkan-fatih-ciftci</a></div>
                </div>
              </div>

              <div style={{ marginTop: 32 }}>
                <div className="section-num" style={{ marginBottom: 16 }}>
                  <span>{lang === "tr" ? "// yayınlanmış" : "// shipped"}</span>
                </div>
                <div className="sidekv">
                  <div className="row">
                    <div className="k">hf · model</div>
                    <div className="v mono-sm"><a href="https://huggingface.co/SkyWalkertT1/turkish_bert_stock_market_classification_sentiment" target="_blank" rel="noreferrer">turkish_bert_stock…</a></div>
                  </div>
                  <div className="row">
                    <div className="k">hf · model</div>
                    <div className="v mono-sm"><a href="https://huggingface.co/SkyWalkertT1/crypto_bert_sentiment" target="_blank" rel="noreferrer">crypto_bert_sentiment</a></div>
                  </div>
                  <div className="row">
                    <div className="k">hf · data</div>
                    <div className="v mono-sm"><a href="https://huggingface.co/datasets/SkyWalkertT1/stock_market_dataset" target="_blank" rel="noreferrer">stock_market_dataset · 5.46k</a></div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="section-num">
            <span>§ 02</span><span className="dim">/</span><span>{lang === "tr" ? "kullandığım" : "uses"}</span>
          </div>
          <div className="two-col" style={{ marginTop: 0 }}>
            <div className="prose">
              <h3>{lang === "tr" ? "Günlük" : "Daily driver"}</h3>
              <ul>
                <li>Arch Linux · Hyprland</li>
                <li>Neovim + lazyvim · ghostty terminal</li>
                <li>Python 3.11, PyTorch, 🤗 Transformers</li>
                <li>Flutter / Dart for mobile</li>
                <li>uv · ruff · pre-commit</li>
              </ul>
              <h3>{lang === "tr" ? "Model yaparken" : "When training"}</h3>
              <ul>
                <li>Weights & Biases for runs</li>
                <li>Hugging Face <code>datasets</code> + <code>accelerate</code></li>
                <li>Colab Pro when the laptop tears up</li>
              </ul>
            </div>
            <div className="prose">
              <h3>{lang === "tr" ? "Mobil teslim" : "On-device"}</h3>
              <ul>
                <li>ONNX Runtime mobile</li>
                <li>TensorFlow Lite + GPU delegate</li>
                <li><code>dart:ffi</code> for custom ops</li>
                <li>YOLOv8-seg, BGE-small, MiniLM re-rankers</li>
              </ul>
              <h3>{lang === "tr" ? "İnandığım" : "Opinions I hold"}</h3>
              <ul>
                <li>{lang === "tr" ? "Eval seti modelden önemlidir." : "Eval sets matter more than the model."}</li>
                <li>{lang === "tr" ? "RAG'ın %70'i BM25 + recency." : "70% of RAG is BM25 + recency."}</li>
                <li>{lang === "tr" ? "Latency bir özelliktir." : "Latency is a feature."}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="footer-cta">
        <div className="glow" />
        <div className="shell">
          <div className="section-num">
            <span>§ 03</span><span className="dim">/</span><span>contact</span>
          </div>
          <h2>
            {t.footer_h_pre}<br />
            <span className="accent">{t.footer_h_accent}</span>
          </h2>
          <p className="sub" style={{ maxWidth: 560 }}>{t.contact_note}</p>
          <div className="links">
            <a className="link-row" href={`mailto:${window.LINKS.email}`}>
              <div>
                <div className="k">email</div>
                <div className="v">{window.LINKS.email}</div>
              </div>
              <Icon.arrowUp className="arrow" />
            </a>
            <a className="link-row" href={window.LINKS.linkedin} target="_blank" rel="noreferrer">
              <div>
                <div className="k">linkedin</div>
                <div className="v">/furkan-fatih-ciftci</div>
              </div>
              <Icon.ext className="arrow" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { About });
})();

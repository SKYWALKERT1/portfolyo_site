/* global React, window */
(() => {
const { useState, useEffect, useRef, useMemo } = React;

// -------- ICONS (inline so we don't pull a lib) --------
const Icon = {
  arrow: (p={}) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  arrowUp: (p={}) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>,
  sun: (p={}) => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>,
  moon: (p={}) => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  search: (p={}) => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  copy: (p={}) => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
  ext: (p={}) => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14 3h7v7"/><line x1="21" y1="3" x2="10" y2="14"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></svg>,
  corner: (p={}) => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="9 10 4 15 9 20"/><path d="M20 4v7a4 4 0 0 1-4 4H4"/></svg>,
  page: (p={}) => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
};

// -------- MetricBadge --------
function MetricBadge({ k, v }) {
  return (
    <span className="metric">
      <span className="rail" />
      <span className="kv">
        <span className="k">{k}</span>
        <span className="v">{v}</span>
      </span>
    </span>
  );
}

// -------- Chip --------
function Chip({ children }) { return <span className="chip">{children}</span>; }

// -------- Code block with copy --------
function Code({ lang="python", children }) {
  const [copied, setCopied] = useState(false);
  const code = useMemo(() => String(children).trim(), [children]);
  // very tiny highlighter — enough to feel right
  const highlighted = useMemo(() => {
    const keywords = /(def |from |import |return|if |elif |else|for |in |class |with |as |None|True|False|self|async|await)/g;
    const esc = (s) => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
    let html = esc(code);
    html = html.replace(/(#[^\n]*)/g, '<span class="tk-com">$1</span>');
    html = html.replace(/("[^"\n]*"|'[^'\n]*')/g, '<span class="tk-str">$1</span>');
    html = html.replace(/\b(\d+\.?\d*)\b/g, '<span class="tk-num">$1</span>');
    html = html.replace(keywords, '<span class="tk-key">$1</span>');
    return html;
  }, [code]);
  return (
    <div className="code">
      <div className="code-head">
        <span className="lang">{lang}</span>
        <button onClick={() => {
          navigator.clipboard?.writeText(code);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        }}>
          {copied ? "copied ✓" : <><Icon.copy /> copy</>}
        </button>
      </div>
      <pre dangerouslySetInnerHTML={{__html: highlighted}} />
    </div>
  );
}

// -------- Callout --------
function Callout({ tag="note", children }) {
  return <div className="callout"><span className="tag">{tag}</span>{children}</div>;
}

Object.assign(window, { Icon, MetricBadge, Chip, Code, Callout });
})();

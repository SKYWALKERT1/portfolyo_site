/* global window */
// Real content sourced from github.com/SKYWALKERT1 + huggingface.co/SkyWalkertT1

const I18N = {
  en: {
    // nav
    nav_work: "work",
    nav_about: "about",
    nav_uses: "uses",
    nav_writing: "notes",
    nav_cv: "cv.pdf",
    nav_contact: "contact",

    // hero
    hero_eyebrow: "İzmir · open to Summer 2026 internships",
    hero_meta: [
      { k: "avail",  v: "Summer 2026" },
      { k: "reply",  v: "~1 day" },
      { k: "stack",  v: "Flutter + ML" },
    ],
    hero_kicker: "ML Engineer — mobile-first.",
    hero_line_1: "I ship ML models",
    hero_line_2: "into mobile products,",
    hero_line_3_pre: "on the",
    hero_line_3_accent: "edge where latency matters.",
    hero_trust: [
      { k: "🤗",    v: "3 models + datasets" },
      { k: "edge", v: "p95 180ms on-device" },
      { k: "cloud", v: "0 bills" },
      { k: "oss",  v: "everything public" },
    ],
    hero_scroll: "scroll",
    hv_train_title: "crypto_bert_sentiment · epoch 3 / 3",
    hv_train_lines: [
      "ep 1 │ loss 0.82 │ val 0.79 │ f1 0.71",
      "ep 2 │ loss 0.41 │ val 0.38 │ f1 0.84",
      "ep 3 │ loss 0.24 │ val 0.26 │ f1 0.88  ← saved",
      "↳ pushed to hf:SkyWalkertT1 · 14:02 UTC",
    ],
    hv_latency_title: "on-device · retrieval p95",
    hv_latency_note: "ms · lower is better",
    hero_lede:
      "Information-Systems & Technologies undergraduate working at the seam of Flutter and applied ML. I build retrieval-augmented systems, fine-tune transformers, and push vision models onto phones without melting the battery.",
    cta_primary: "See the work",
    cta_secondary: "Get in touch",

    // now bar
    now_label: "// now",
    now_text:
      "Building HyprContext — a local-first RAG memory layer for LLMs. Researching on-device quantization for YOLO.",

    // featured work
    sec_work: "featured work",
    sec_work_sub: "Three projects that show how I think about shipping AI.",

    // numbers ribbon
    sec_numbers: "by the numbers",
    sec_numbers_sub: "Unpolished figures from the repos and model cards.",

    // how I ship
    sec_process: "how i ship",
    sec_process_sub: "Four steps I keep running, in this order, until the model is on someone's phone.",
    process: [
      { n: "01", h: "Frame", d: "Write the eval set before the model. If I can't describe 'good', I can't build it." },
      { n: "02", h: "Train", d: "Baseline first (linear / BM25 / nearest-neighbour). Only then reach for a transformer." },
      { n: "03", h: "Quantize", d: "int8 with a 2% mIoU budget, ONNX graph surgery, kill ops the runtime doesn't support." },
      { n: "04", h: "Ship", d: "Flutter + GPU delegate, measure p95 on a mid-tier Android, ship behind a feature flag." },
    ],

    // lab bench / changelog
    sec_lab: "lab bench",
    sec_lab_sub: "Recent commits across repos and model cards.",

    // timeline preview
    sec_tl: "track record",
    sec_tl_sub: "A compact view. Full version on the about page.",
    tl_more: "see full timeline →",

    // capabilities
    sec_caps: "capabilities",
    sec_caps_sub: "What I actually do, day to day.",
    caps: [
      {
        n: "01",
        h: "Applied research",
        d: "Fine-tuning transformers (BERT, YOLOv8) on domain data. Evaluating honestly against baselines, not vibes.",
      },
      {
        n: "02",
        h: "Mobile ML delivery",
        d: "Flutter + TFLite / ONNX Runtime. Shipping vision and language models into real apps with predictable latency.",
      },
      {
        n: "03",
        h: "RAG & LLM tooling",
        d: "Local-first retrieval with Ollama + ChromaDB. Memory systems, hybrid search, evaluation pipelines.",
      },
      {
        n: "04",
        h: "Data plumbing",
        d: "Cleaning, labelling, curating. Published datasets on Hugging Face. SQL, pandas, pragmatic pipelines.",
      },
    ],

    // stack strip
    stack_label: "// stack",

    // writing
    sec_writing: "notes",
    sec_writing_sub: "Rough field notes from building this stuff.",

    // footer
    footer_h_pre: "Interning this summer.",
    footer_h_accent: "Let's talk.",
    footer_sub:
      "Looking for an ML / applied-AI internship where mobile delivery or production RAG is actually on the roadmap. I read every message.",

    // case study
    cs_back: "All work",
    cs_tldr: "tl;dr",
    cs_problem: "Problem",
    cs_approach: "Approach",
    cs_result: "Result",
    cs_context: "Context",
    cs_data: "Data & evaluation",
    cs_arch: "Architecture",
    cs_exp: "Experiments",
    cs_deploy: "Deployment",
    cs_learn: "Learnings",
    cs_links: "Links",

    // about
    about_h: "A short introduction.",
    about_p1:
      "I'm Furkan — an Information Systems & Technologies student in Türkiye, figuring out how AI actually ships. Most days that means training a small model on the laptop, then fighting to make it run under 200 ms on a mid-range Android. Both halves of that loop matter to me.",
    about_p2:
      "My GitHub skews practical: face detection, Turkish financial sentiment with BERT, breast-cancer classification with a neural net, article abstract analysis, a bunch of Flutter experiments. I publish models and datasets on Hugging Face because a locked-up model isn't really a model.",
    about_p3:
      "Outside the keyboard: Arch Linux, running, and a frankly unreasonable amount of time on tweaking editor configs.",

    // contact / 404 strings
    contact_note:
      "Fastest: email. I answer within a day. Recruiters — please mention the role and team.",
    notfound_line_1: "404 — nothing here.",
    notfound_line_2: "HTTP 404 · path not in my index",
    notfound_line_3: "Maybe try the command palette ( / ).",
  },
  tr: {
    nav_work: "çalışmalar",
    nav_about: "hakkımda",
    nav_uses: "kullanım",
    nav_writing: "notlar",
    nav_cv: "cv.pdf",
    nav_contact: "iletişim",

    hero_eyebrow: "İzmir · 2026 yaz stajına açık",
    hero_meta: [
      { k: "açık",   v: "2026 yazı" },
      { k: "yanıt",  v: "~1 gün" },
      { k: "stack",  v: "Flutter + ML" },
    ],
    hero_kicker: "ML Mühendisi — mobil odaklı.",
    hero_line_1: "ML modellerini",
    hero_line_2: "mobil ürünlere yerleştiriyorum,",
    hero_line_3_pre: "gecikmenin önemli olduğu",
    hero_line_3_accent: "edge'de çalışacak şekilde.",
    hero_trust: [
      { k: "🤗",    v: "3 model + veri seti" },
      { k: "edge", v: "cihaz üstü p95 180ms" },
      { k: "cloud", v: "0 fatura" },
      { k: "oss",  v: "her şey açık kaynak" },
    ],
    hero_scroll: "aşağı",
    hv_train_title: "crypto_bert_sentiment · epoch 3 / 3",
    hv_train_lines: [
      "ep 1 │ loss 0.82 │ val 0.79 │ f1 0.71",
      "ep 2 │ loss 0.41 │ val 0.38 │ f1 0.84",
      "ep 3 │ loss 0.24 │ val 0.26 │ f1 0.88  ← kaydedildi",
      "↳ hf:SkyWalkertT1'e push · 14:02 UTC",
    ],
    hv_latency_title: "cihaz üstü · retrieval p95",
    hv_latency_note: "ms · küçük olan iyi",
    hero_lede:
      "Bilişim Sistemleri ve Teknolojileri öğrencisiyim; Flutter ve uygulamalı ML'in kesişiminde çalışıyorum. Retrieval-augmented sistemler kuruyorum, transformer'ları fine-tune ediyorum ve vision modellerini telefon pilini eritmeden çalıştırmaya çalışıyorum.",
    cta_primary: "Projeleri gör",
    cta_secondary: "İletişim",

    now_label: "// şimdi",
    now_text:
      "HyprContext üzerinde çalışıyorum — LLM'ler için lokal-first bir RAG hafıza katmanı. On-device YOLO quantization araştırıyorum.",

    sec_work: "öne çıkan",
    sec_work_sub: "AI'ı ürünleştirme düşünce tarzımı gösteren üç proje.",

    sec_numbers: "rakamlarla",
    sec_numbers_sub: "Repo ve model kartlarından parlatılmamış sayılar.",

    sec_process: "nasıl ürünleştiriyorum",
    sec_process_sub: "Modeli birinin telefonuna indirene kadar bu sırayla döndürdüğüm dört adım.",
    process: [
      { n: "01", h: "Çerçevele", d: "Modelden önce eval setini yaz. 'İyi'yi tarif edemiyorsam onu kuramam." },
      { n: "02", h: "Eğit", d: "Önce baseline (lineer / BM25 / nearest-neighbour). Transformer'a ancak ondan sonra uzan." },
      { n: "03", h: "Kuantize", d: "%2 mIoU bütçeli int8, ONNX graph cerrahi, runtime'ın desteklemediği op'ları kes at." },
      { n: "04", h: "Teslim", d: "Flutter + GPU delegate, orta sınıf Android'de p95 ölç, feature-flag arkasında ship." },
    ],

    sec_lab: "laboratuvar",
    sec_lab_sub: "Repo ve model kartlarındaki son commit'ler.",

    sec_tl: "özgeçmiş özeti",
    sec_tl_sub: "Sıkıştırılmış görünüm. Tam hâli about sayfasında.",
    tl_more: "tam zaman çizelgesi →",

    sec_caps: "yetkinlikler",
    sec_caps_sub: "Günlük olarak gerçekten ne yapıyorum.",
    caps: [
      {
        n: "01",
        h: "Uygulamalı araştırma",
        d: "Alan verisiyle transformer (BERT, YOLOv8) fine-tune. Dürüst, baseline'a karşı değerlendirme — his değil.",
      },
      {
        n: "02",
        h: "Mobil ML teslimi",
        d: "Flutter + TFLite / ONNX Runtime. Vision ve dil modellerini öngörülebilir gecikmeyle gerçek uygulamalara sokuyorum.",
      },
      {
        n: "03",
        h: "RAG & LLM araçları",
        d: "Ollama + ChromaDB ile lokal-first retrieval. Hafıza sistemleri, hibrit arama, değerlendirme hattı.",
      },
      {
        n: "04",
        h: "Veri altyapısı",
        d: "Temizleme, etiketleme, küratörlük. Hugging Face'de veri seti yayınladım. SQL, pandas, pragmatik pipeline'lar.",
      },
    ],

    stack_label: "// stack",

    sec_writing: "notlar",
    sec_writing_sub: "Bunları kurarken tuttuğum saha notları.",

    footer_h_pre: "Bu yaz staj yapıyorum.",
    footer_h_accent: "Konuşalım.",
    footer_sub:
      "Mobil teslim veya production RAG'ın yol haritasında gerçekten olduğu bir ML / applied-AI stajı arıyorum. Gelen her mesajı okuyorum.",

    cs_back: "Tüm işler",
    cs_tldr: "özet",
    cs_problem: "Problem",
    cs_approach: "Yaklaşım",
    cs_result: "Sonuç",
    cs_context: "Bağlam",
    cs_data: "Veri ve değerlendirme",
    cs_arch: "Mimari",
    cs_exp: "Deneyler",
    cs_deploy: "Deployment",
    cs_learn: "Öğrendiklerim",
    cs_links: "Bağlantılar",

    about_h: "Kısa bir tanışma.",
    about_p1:
      "Ben Furkan — Türkiye'de Bilişim Sistemleri ve Teknolojileri okuyan bir öğrenciyim, AI'ın nasıl gerçekten ürünleştiğini anlamaya çalışıyorum. Bölüm iş-dünyasına yakın duruyor; yazılım, veri ve karar-destek hepsi aynı müfredatta — bu da beni modelle ürünün arasındaki boşluğu sevmeye itti. Genellikle günüm dizüstünde ufak bir model eğitip, sonra bunu orta seviye bir Android'de 200 ms altında çalıştırmak için savaşmakla geçiyor. Bu döngünün her iki yarısı da benim için önemli.",
    about_p2:
      "GitHub'ım pratik ağırlıklı: yüz tespiti, Türkçe finans duygu analizi (BERT), meme kanseri sınıflandırma (nöral ağ), makale özet analizi, bir sürü Flutter deneyi. Modelleri ve veri setlerini Hugging Face'de yayınlıyorum — çünkü paylaşılmayan model gerçekten model sayılmaz.",
    about_p3:
      "Klavye dışında: Arch Linux, koşu ve editör konfigüne harcadığım açıklanamaz miktarda zaman.",

    contact_note:
      "En hızlı yol: e-posta. Bir gün içinde dönüyorum. Recruiter iseniz rolü ve ekibi belirtin, lütfen.",
    notfound_line_1: "404 — burada bir şey yok.",
    notfound_line_2: "HTTP 404 · yol indekste yok",
    notfound_line_3: "Komut paletini dene ( / ).",
  },
};

// ---------- Projects / case studies ----------
// All drawn from github.com/SKYWALKERT1 & huggingface.co/SkyWalkertT1

const PROJECTS = [
  {
    slug: "hyprcontext",
    num: "01",
    kind: { en: "system", tr: "sistem" },
    title: "HyprContext",
    summary: {
      en: "A local-first LLM memory layer. Ollama + ChromaDB with hybrid retrieval, so small models remember what mattered three conversations ago.",
      tr: "Lokal-first bir LLM hafıza katmanı. Ollama + ChromaDB ile hibrit retrieval — küçük modeller üç konuşma önce nelerin önemli olduğunu hatırlasın diye.",
    },
    metrics: [
      { k: "recall@5", v: "0.84" },
      { k: "p95", v: "180ms" },
      { k: "cost", v: "$0" },
    ],
    chips: ["python", "ollama", "chromadb", "fastapi", "langchain"],
    stack: ["Ollama (Llama 3.1 8B)", "ChromaDB", "FastAPI", "LangChain", "SQLite"],
    repo: "https://github.com/SKYWALKERT1",
  },
  {
    slug: "tr-bert-sentiment",
    num: "02",
    kind: { en: "model", tr: "model" },
    title: "Turkish BERT · stock sentiment",
    summary: {
      en: "Fine-tuned BERT classifier for Turkish stock-market headlines. Published to Hugging Face with a 5.46k curated dataset.",
      tr: "Türkçe borsa başlıkları için fine-tune BERT sınıflandırıcı. 5.46k küratörlü veri setiyle birlikte Hugging Face'de yayınlandı.",
    },
    metrics: [
      { k: "f1", v: "0.91" },
      { k: "params", v: "0.1B" },
      { k: "dataset", v: "5.46k" },
    ],
    chips: ["pytorch", "transformers", "bert", "huggingface"],
    stack: ["PyTorch", "🤗 Transformers", "Datasets", "Weights & Biases"],
    repo: "https://huggingface.co/SkyWalkertT1/turkish_bert_stock_market_classification_sentiment",
  },
  {
    slug: "crypto-bert-sentiment",
    num: "03",
    kind: { en: "model", tr: "model" },
    title: "Crypto BERT · sentiment",
    summary: {
      en: "Fine-tuned BERT for cryptocurrency sentiment. Handles Turkish + English crypto chatter, trained with class-balanced sampling and published on Hugging Face.",
      tr: "Kripto para sentiment analizi için fine-tune BERT. Türkçe + İngilizce kripto gündemini okuyor, class-balanced sampling ile eğitildi, Hugging Face'de yayında.",
    },
    metrics: [
      { k: "f1", v: "0.88" },
      { k: "params", v: "0.1B" },
      { k: "classes", v: "3" },
    ],
    chips: ["pytorch", "transformers", "bert", "huggingface"],
    stack: ["PyTorch", "🤗 Transformers", "Datasets", "scikit-learn"],
    repo: "https://huggingface.co/SkyWalkertT1/crypto_bert_sentiment",
  },
];

// Full HyprContext case study content (shown on /work/hyprcontext)
const HYPRCONTEXT_DETAIL = {
  en: {
    tldr: {
      problem:
        "Small local LLMs (7-8B) forget everything between sessions. Vector-DB retrieval alone returns stale, off-topic chunks because pure cosine similarity has no idea what the user actually cares about now.",
      approach:
        "Hybrid retrieval: dense embeddings (bge-small) + BM25 + recency decay + a tiny cross-encoder reranker. Memory is tiered — scratchpad, session, long-term — with a cheap summarization pass between tiers.",
      result:
        "On a 200-turn eval set, recall@5 went from 0.61 (pure vector) to 0.84, with p95 retrieval latency 180 ms on my 2021 laptop — no GPU needed at query time.",
    },
    context:
      "I wanted to run agents on my own machine without paying OpenAI-tax, but every local stack I tried either gave goldfish-tier memory (sliding window) or shoved a raw vector DB in and called it RAG. Useful conversations with an 8B model need help: the model is small, so the context you give it has to be surgical.",
    data:
      "Built a 200-turn synthetic+real eval set across four personas (coding, personal life, reading notes, project planning). Gold relevance judgments labeled by hand for 60 anchor turns. Baseline: FAISS + bge-small, k=5.",
    experiments: [
      { row: "baseline — vector only",      r1: "0.61", r5: "0.72", p95: "110", note: "stale chunks" },
      { row: "+ BM25 hybrid",               r1: "0.66", r5: "0.78", p95: "125", note: "helps on names" },
      { row: "+ recency decay",             r1: "0.69", r5: "0.81", p95: "128", note: "big on sessions" },
      { row: "+ cross-encoder rerank (top-20 → 5)", r1: "0.74", r5: "0.84", p95: "180", note: "sweet spot", best: true },
      { row: "+ LLM rerank (ablation)",     r1: "0.75", r5: "0.85", p95: "520", note: "not worth it" },
    ],
    deploy:
      "FastAPI service exposes /remember, /recall, /forget. ChromaDB for the vector store, SQLite for metadata and tiering. Everything containerized; whole stack fits in 1.4 GB of RAM at idle.",
    learnings: [
      "Recency decay is criminally underrated. Cosine similarity alone treats yesterday and last quarter the same — it shouldn't.",
      "Cross-encoder rerank beats LLM rerank on both latency and quality for short memory snippets. Don't bring a howitzer.",
      "Eval set design matters more than the retrieval method. I rewrote mine twice before the numbers made sense.",
      "Where I was wrong: I started with k=20 everywhere, assuming more context = better. It was worse. Small model + 20 chunks = confused model.",
    ],
  },
  tr: {
    tldr: {
      problem:
        "Küçük lokal LLM'ler (7-8B) oturumlar arası her şeyi unutuyor. Sadece vektör-DB retrieval bayat, konu dışı chunk'lar döndürüyor — çünkü saf cosine benzerliğinin kullanıcının şu an ne istediğinden haberi yok.",
      approach:
        "Hibrit retrieval: dense embedding (bge-small) + BM25 + recency decay + küçük bir cross-encoder reranker. Hafıza katmanlı — scratchpad, session, long-term — aralarında ucuz bir özetleme geçişi var.",
      result:
        "200 turn'luk eval setinde recall@5 0.61'den (saf vektör) 0.84'e çıktı. 2021 dizüstümde p95 retrieval gecikmesi 180 ms — query anında GPU gerekmiyor.",
    },
    context:
      "Ajanları kendi makinemde OpenAI vergisi ödemeden çalıştırmak istedim, ama denediğim her lokal stack ya japon-balığı-hafıza veriyordu (sliding window), ya da ham bir vektör DB koyup buna RAG diyordu. 8B modelle gerçekten yararlı bir konuşma için modele verdiğin bağlam cerrahi olmalı.",
    data:
      "Dört persona üzerinde (kod, özel hayat, okuma notları, proje planlama) 200 turn'luk sentetik+gerçek bir eval seti kurdum. 60 anchor turn için gold relevance etiketleri elle. Baseline: FAISS + bge-small, k=5.",
    experiments: [
      { row: "baseline — sadece vektör",    r1: "0.61", r5: "0.72", p95: "110", note: "bayat chunk" },
      { row: "+ BM25 hibrit",               r1: "0.66", r5: "0.78", p95: "125", note: "isimde faydalı" },
      { row: "+ recency decay",             r1: "0.69", r5: "0.81", p95: "128", note: "oturumda büyük" },
      { row: "+ cross-encoder rerank",      r1: "0.74", r5: "0.84", p95: "180", note: "tatlı nokta", best: true },
      { row: "+ LLM rerank (ablation)",     r1: "0.75", r5: "0.85", p95: "520", note: "değmez" },
    ],
    deploy:
      "FastAPI servisi /remember, /recall, /forget sunuyor. Vektör için ChromaDB, metadata ve katmanlama için SQLite. Her şey containerize; boşta tüm stack 1.4 GB RAM.",
    learnings: [
      "Recency decay akıl almaz derecede küçümseniyor. Saf cosine dünü ve geçen çeyreği aynı sayıyor — saymamalı.",
      "Kısa hafıza snippet'larında cross-encoder rerank, LLM rerank'i hem gecikme hem kalite olarak yeniyor. Sineğe top atma.",
      "Eval seti tasarımı retrieval yönteminden daha önemli. Rakamlar oturana kadar setimi iki kez yeniden yazdım.",
      "Hata yaptığım yer: her yerde k=20 ile başladım, 'daha fazla context = daha iyi' sandım. Daha kötüydü. Küçük model + 20 chunk = kafası karışmış model.",
    ],
  },
};

const NOTES = [
  {
    date: "2025-11",
    slug: "turkish-bert-stock",
    title: {
      en: "Fine-tuning dbmdz/bert-base-turkish-cased on 5.46k finance headlines",
      tr: "dbmdz/bert-base-turkish-cased'i 5.46k finans başlığında fine-tune",
    },
    tag: { en: "nlp", tr: "nlp" },
    read: "9 min",
    repo: "https://huggingface.co/SkyWalkertT1/turkish_bert_stock_market_classification_sentiment",
  },
  {
    date: "2025-10",
    slug: "labeling-5460",
    title: {
      en: "Labeling 5,460 Turkish stock headlines alone — a playbook",
      tr: "5.460 Türkçe borsa başlığını tek başına etiketlemek — bir playbook",
    },
    tag: { en: "data", tr: "veri" },
    read: "6 min",
    repo: "https://huggingface.co/datasets/SkyWalkertT1/stock_market_dataset",
  },
  {
    date: "2025-08",
    slug: "bert-vs-llm-crypto",
    title: {
      en: "Crypto sentiment: a 0.1B fine-tuned BERT beats my prompted LLM",
      tr: "Kripto sentiment: 0.1B fine-tune BERT, prompt'ladığım LLM'i geçti",
    },
    tag: { en: "nlp", tr: "nlp" },
    read: "7 min",
    repo: "https://huggingface.co/SkyWalkertT1/crypto_bert_sentiment",
  },
  {
    date: "2025-12",
    slug: "hf-cards-hygiene",
    title: {
      en: "HF model & dataset cards: the sections I wish I'd written first",
      tr: "HF model ve dataset kartları: keşke baştan yazsaydım dediğim bölümler",
    },
    tag: { en: "ops", tr: "ops" },
    read: "4 min",
    repo: "https://huggingface.co/SkyWalkertT1",
  },
];

// ---------- Numbers ribbon ----------
const STATS = [
  { n: "03",     k: { en: "models + datasets on 🤗", tr: "🤗 üzerinde model + veri seti" } },
  { n: "5.46k",  k: { en: "headlines labeled by hand",  tr: "el ile etiketlenmiş başlık" } },
  { n: "180 ms", k: { en: "p95 retrieval · HyprContext", tr: "p95 retrieval · HyprContext" } },
  { n: "0",      k: { en: "cloud bills for inference",   tr: "inference için bulut faturası" } },
];

// ---------- Lab bench / changelog ----------
const CHANGELOG = [
  {
    d: "2026-04-12", repo: "hf / crypto_bert_sentiment",
    msg: { en: "class-balanced retrain, +3 pt F1 on the long-tail labels", tr: "class-balanced yeniden eğitim, uzun-kuyruk etiketlerde +3 F1" },
    tag: "train",
  },
  {
    d: "2026-03-28", repo: "github / hyprcontext",
    msg: { en: "hybrid fuse now does recency decay on a per-tier basis", tr: "hibrit fuse artık katman bazında recency decay uyguluyor" },
    tag: "feat",
  },
  {
    d: "2026-03-14", repo: "hf / turkish_bert_stock…",
    msg: { en: "dataset card rewrite, eval split details and limitations added", tr: "veri seti kartı yeniden yazıldı, eval split detayları ve sınırlılıklar eklendi" },
    tag: "docs",
  },
  {
    d: "2026-02-22", repo: "github / closetly-exp",
    msg: { en: "int8 YOLOv8-seg port · 3.1× speedup on Pixel 6, -2 pt mIoU", tr: "int8 YOLOv8-seg taşıma · Pixel 6'da 3.1× hız, -2 mIoU" },
    tag: "perf",
  },
  {
    d: "2026-02-09", repo: "hf / stock_market_dataset",
    msg: { en: "uploaded 5.46k curated headlines, 3-class sentiment", tr: "5.46k küratörlü başlık yüklendi, 3-sınıf sentiment" },
    tag: "data",
  },
  {
    d: "2026-01-30", repo: "github / hyprcontext",
    msg: { en: "replaced LLM rerank with cross-encoder, p95 520ms → 180ms", tr: "LLM rerank yerine cross-encoder, p95 520ms → 180ms" },
    tag: "perf",
  },
];

const STACK_ITEMS = [
  "PyTorch",
  "🤗 Transformers",
  "Flutter",
  "Dart",
  "ONNX Runtime",
  "TensorFlow Lite",
  "FastAPI",
  "ChromaDB",
  "Ollama",
  "YOLOv8",
  "OpenCV",
  "LangChain",
  "SQLite",
  "Firebase",
  "Docker",
  "Arch Linux",
];

const TIMELINE = {
  en: [
    { yr: "2025 — now", role: "Open-source + research projects", place: "self-directed", blurb: "HyprContext, Closetly, published Turkish BERT models & datasets to Hugging Face." },
    { yr: "2024",       role: "BST Undergraduate · Information Systems & Technologies", place: "Türkiye", blurb: "Coursework straddles software, data, and decision systems. Personal projects in parallel; Flutter on the side." },
    { yr: "2023",       role: "First neural net that actually worked", place: "dorm room",      blurb: "Breast cancer classifier. Proud of it then, embarrassed by it now — a good sign." },
  ],
  tr: [
    { yr: "2025 — şimdi", role: "Açık kaynak + araştırma projeleri", place: "kendi başıma",   blurb: "HyprContext, Closetly; Hugging Face'de Türkçe BERT modelleri ve veri setleri yayınladım." },
    { yr: "2024",         role: "BST Lisans · Bilişim Sistemleri ve Teknolojileri", place: "Türkiye", blurb: "Müfredat yazılım + veri + karar-destek üçlüsünde dolaşıyor. Yan branş Flutter, kişisel proje ritmi istikrarlı." },
    { yr: "2023",         role: "İlk gerçekten çalışan nöral ağım", place: "yurt odası",     blurb: "Meme kanseri sınıflandırıcı. O zaman gurur, şimdi utanç — iyi işaret." },
  ],
};

const LINKS = {
  email: "fatihfrkn.cftci43@gmail.com",
  github: "https://github.com/SKYWALKERT1",
  linkedin: "https://www.linkedin.com/in/furkan-fatih-ciftci",
  huggingface: "https://huggingface.co/SkyWalkertT1",
};

Object.assign(window, {
  I18N,
  PROJECTS,
  HYPRCONTEXT_DETAIL,
  NOTES,
  STATS,
  CHANGELOG,
  STACK_ITEMS,
  TIMELINE,
  LINKS,
});

# SuvidhaShala — IDE Context File
# Read this before touching any file in this project.
# Last updated: May 2026

---

## WHAT THIS PROJECT IS

SuvidhaShala (सुविधाशाला) — "The Accessible Classroom" — is an AI-powered
web platform that transforms any Indian school textbook chapter into three
parallel, print-ready versions:

- **Edition A — Standard**: Improved clarity, bold key terms, better structure
- **Edition B — Dyslexia-Friendly**: Syllable-broken words, short sentences,
  wide spacing, OpenDyslexic-compatible layout, reading ruler strip
- **Edition C — ADHD/Dyscalculia**: Numbered micro-steps, checkbox progress,
  DEFINITION / EXAMPLE / TRY IT / REMEMBER boxes, visual number lines,
  fidget break prompts

Target users: Indian government school teachers, Classes 1–8.
The product is always free for government school teachers.

---

## PROJECT ARCHITECTURE

```
suvidha-shala/
├── frontend/                  # Next.js 14 App Router (already built in Figma)
│   ├── app/
│   │   ├── page.tsx           # Landing page
│   │   ├── generate/
│   │   │   └── page.tsx       # Main generator screen
│   │   └── whatsapp/
│   │       └── page.tsx       # WhatsApp bot info page
│   ├── components/
│   │   ├── Sidebar.tsx        # Input panel (NCERT / Upload / Camera tabs)
│   │   ├── ThreePanelView.tsx # Three-panel synchronized preview
│   │   ├── PanelCard.tsx      # Individual edition panel
│   │   ├── VersionSelector.tsx# Standard / Dyslexia / ADHD toggle cards
│   │   └── ProgressTracker.tsx# Stage 1/2/3 loading indicator
│   └── public/
│
├── backend/                   # Node.js + Express (TO BE BUILT)
│   ├── server.js              # Entry point
│   ├── routes/
│   │   ├── generate.js        # POST /api/generate — main pipeline
│   │   ├── chapters.js        # GET /api/chapters — NCERT library
│   │   ├── download.js        # GET /api/download/:fileId — file serving
│   │   └── webhook.js         # POST /webhook/whatsapp — WA bot
│   ├── services/
│   │   ├── promptChain.js     # Three-stage GPT-4o orchestration
│   │   ├── ocrService.js      # GPT-4o Vision + sharp preprocessing
│   │   ├── documentGen.js     # Puppeteer PDF + docx generation
│   │   ├── whatsappService.js # Meta WhatsApp Cloud API calls
│   │   └── cacheService.js    # Chapter response caching
│   ├── templates/
│   │   ├── standard.html      # Puppeteer HTML template — Edition A
│   │   ├── dyslexia.html      # Puppeteer HTML template — Edition B
│   │   └── adhd.html          # Puppeteer HTML template — Edition C
│   ├── data/
│   │   └── chapters.json      # Pre-processed NCERT chapter library
│   └── utils/
│       ├── textExtractor.js   # pdfjs-dist text extraction
│       └── imagePreprocessor.js # sharp image preprocessing
│
├── database/
│   └── schema.sql             # PostgreSQL schema (Supabase)
│
├── .env.example               # All required env vars listed
└── SUVIDHA_SHALA_CONTEXT.md   # This file
```

---

## TECH STACK — EXACT VERSIONS

### Frontend (already built — do not modify without reason)
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Deployed on Vercel

### Backend (to be built)
- Node.js 20+
- Express 4.x
- OpenAI Node SDK (`openai` npm package) — NOT fetch calls directly
- `sharp` — image preprocessing for OCR
- `pdfjs-dist` — PDF text extraction
- `puppeteer` — HTML to PDF rendering
- `docx` — Word document generation
- `multer` — file upload handling
- `node-cache` — in-memory chapter caching
- `dotenv` — environment variables
- `cors` — cross-origin for frontend
- `axios` — WhatsApp API calls

### Database
- PostgreSQL via Supabase (free tier)
- Supabase Storage for generated file serving

### WhatsApp
- Meta WhatsApp Business Cloud API (official, free tier)
- Webhook-based, no Twilio

---

## ENVIRONMENT VARIABLES

All of these must exist in `.env`. Never hardcode any of them.

```env
# OpenAI
OPENAI_API_KEY=sk-...

# Supabase
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# WhatsApp Business Cloud API
WHATSAPP_PHONE_NUMBER_ID=1234567890
WHATSAPP_ACCESS_TOKEN=EAAxxxx
WHATSAPP_VERIFY_TOKEN=suvidha_verify_2026   # custom string for webhook verification

# App
PORT=3001
FRONTEND_URL=http://localhost:3000
NODE_ENV=development

# File storage (temp generated files TTL)
FILE_TTL_HOURS=24
```

---

## DATABASE SCHEMA

### Table: chapters
Stores pre-processed NCERT chapter content.

```sql
CREATE TABLE chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_num INTEGER NOT NULL,           -- 1 through 8
  subject VARCHAR(50) NOT NULL,         -- 'Mathematics', 'Science', etc.
  chapter_num INTEGER NOT NULL,
  chapter_title VARCHAR(200) NOT NULL,
  language VARCHAR(20) DEFAULT 'english',
  content_json JSONB NOT NULL,          -- structured chapter content
  learning_objectives TEXT[],           -- extracted objectives array
  word_count INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(class_num, subject, chapter_num, language)
);
```

### Table: generation_jobs
Tracks every generation request for caching and analytics.

```sql
CREATE TABLE generation_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id UUID REFERENCES chapters(id),
  source_type VARCHAR(20) NOT NULL,     -- 'library', 'upload', 'camera'
  versions_requested TEXT[] NOT NULL,   -- ['standard', 'dyslexia', 'adhd']
  language VARCHAR(20) DEFAULT 'english',
  status VARCHAR(20) DEFAULT 'pending', -- 'pending','processing','done','failed'
  standard_file_url TEXT,
  dyslexia_file_url TEXT,
  adhd_file_url TEXT,
  standard_docx_url TEXT,
  dyslexia_docx_url TEXT,
  adhd_docx_url TEXT,
  quality_score JSONB,                  -- fidelity scores per version
  generation_time_ms INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP                  -- 24hrs from creation
);
```

### Table: whatsapp_sessions
WhatsApp conversation state per phone number.

```sql
CREATE TABLE whatsapp_sessions (
  phone_number VARCHAR(20) PRIMARY KEY,
  conversation_state VARCHAR(50) DEFAULT 'greeting',
  -- states: greeting, awaiting_class, awaiting_subject,
  --         awaiting_chapter, awaiting_version, processing, done
  class_num INTEGER,
  subject VARCHAR(50),
  chapter_num INTEGER,
  version_type VARCHAR(20),
  last_job_id UUID REFERENCES generation_jobs(id),
  last_message_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## THE AI PIPELINE — CRITICAL — READ THIS CAREFULLY

The core of SuvidhaShala is a THREE-STAGE prompt chain. This is not a
single LLM call. Every generation goes through exactly these stages in order.

### Stage 1 — Chapter Analysis
- Model: gpt-4o
- Input: Raw chapter text
- Purpose: Extract structure so Stage 2 has clean inputs
- Output: JSON object (see schema below)
- Max tokens: 2000
- Temperature: 0.1 (deterministic — this is analysis, not generation)

Stage 1 output schema:
```json
{
  "learning_objectives": ["string"],
  "complex_sentences": [
    { "original": "string", "complexity_reason": "string" }
  ],
  "technical_terms": [
    { "term": "string", "definition": "string", "syllables": "string" }
  ],
  "numerical_content": [
    { "type": "calculation|concept|measurement", "content": "string" }
  ],
  "procedural_sections": ["string"],
  "total_objectives_count": 6
}
```

### Stage 2 — Parallel Adaptation (THREE CONCURRENT API CALLS)
- Model: gpt-4o
- Input: Original chapter text + Stage 1 JSON
- CRITICAL: All three calls run concurrently using Promise.all()
  NOT sequentially. Sequential calls triple the wait time.
- Temperature: 0.3
- Max tokens: 4000 per call

Each call uses a different system prompt:

**Standard system prompt constraints:**
- Improve paragraph structure and heading hierarchy
- Bold all key terms on first use
- Maximum 20 words per sentence
- Active voice throughout
- Preserve every learning objective from Stage 1
- Output clean HTML with semantic tags

**Dyslexia system prompt constraints:**
- Maximum 12 words per sentence — hard limit
- Break ALL technical terms into syllables with · separator
- Active voice only — no passive constructions
- Left-aligned text only (no justify)
- Add phonics guide for every technical term
- Line breaks after every 3-4 sentences
- Preserve every learning objective from Stage 1
- Output clean HTML with class="dyslexia-content"

**ADHD/Dyscalculia system prompt constraints:**
- Convert ALL processes into numbered micro-steps (one action per step)
- Add □ checkbox before each step
- Wrap definitions in <div class="box definition">
- Wrap examples in <div class="box example">
- Wrap key reminders in <div class="box remember">
- Insert "TRY IT" activity every 3-4 steps
- Add fidget break every 2 pages: "Stand up. Stretch. Sit back."
- Contextualise all numbers with real-world references
- Repeat key formulas/facts on every page
- Preserve every learning objective from Stage 1
- Output clean HTML with class="adhd-content"

### Stage 3 — Quality Check
- Model: gpt-4o
- Input: All three adapted versions + original learning objectives from Stage 1
- Purpose: Verify curriculum fidelity — no learning objective was lost
- Output: JSON quality report
- Temperature: 0.1
- Max tokens: 1000

Stage 3 output schema:
```json
{
  "standard_fidelity": 0.94,
  "dyslexia_fidelity": 0.91,
  "adhd_fidelity": 0.89,
  "flagged_sections": [
    {
      "version": "dyslexia",
      "section": "Section 3 — Minerals",
      "reason": "Learning objective on mineral deficiency not found",
      "severity": "warning"
    }
  ],
  "all_objectives_verified": true,
  "objectives_covered": 6,
  "objectives_total": 6
}
```

If any fidelity score < 0.80, that version's flagged sections are
marked with a warning banner in the frontend response.

---

## API ROUTES — COMPLETE SPECIFICATION

### POST /api/generate
Main generation endpoint. Called by the frontend generator screen.

Request body:
```json
{
  "source": "library | upload | camera",
  "chapterId": "uuid",           // if source = library
  "language": "english | hindi",
  "versions": ["standard", "dyslexia", "adhd"]
}
```
For upload/camera: multipart/form-data with file(s) attached.

Response (streaming preferred, polling acceptable for hackathon):
```json
{
  "jobId": "uuid",
  "status": "done",
  "generationTimeMs": 21340,
  "versions": {
    "standard": {
      "html": "<html content>",
      "pdfUrl": "https://supabase.../standard.pdf",
      "docxUrl": "https://supabase.../standard.docx",
      "fidelityScore": 0.94,
      "flagged": false
    },
    "dyslexia": { ... },
    "adhd": { ... }
  },
  "qualityReport": { ... },
  "chapterMeta": {
    "class": 5,
    "subject": "Science",
    "chapterNum": 2,
    "title": "Components of Food"
  }
}
```

### GET /api/chapters
Returns chapter list for NCERT library dropdowns.

Query params: ?class=5&subject=Science&language=english

Response:
```json
{
  "chapters": [
    { "id": "uuid", "chapterNum": 1, "title": "Food: Where Does It Come From?" },
    { "id": "uuid", "chapterNum": 2, "title": "Components of Food" }
  ]
}
```

### GET /api/chapters/:id
Returns full chapter content for a specific chapter.

### GET /api/download/:fileId
Serves generated PDF/DOCX files. Validates file exists and not expired.

### POST /webhook/whatsapp
Meta webhook for WhatsApp bot messages.

GET /webhook/whatsapp — webhook verification (required by Meta).
Query params: hub.mode, hub.verify_token, hub.challenge

POST /webhook/whatsapp — incoming messages.
Reads message, advances conversation state, triggers generation if
all parameters collected, sends PDF back via WhatsApp API.

---

## WHATSAPP BOT — CONVERSATION STATE MACHINE

```
STATES:
greeting        → send welcome + ask for class number
awaiting_class  → validate 1-8, save, ask for subject
awaiting_subject→ validate subject, save, ask for chapter
awaiting_chapter→ validate chapter exists, save, ask for version
awaiting_version→ validate version type, trigger generation
processing      → send "generating..." message, wait for pipeline
done            → send PDF file, offer new worksheet

SHORTCUTS:
If message matches pattern: "[class] [subject] [chapter] [version]"
e.g. "5 science 2 dyslexia"
→ skip guided flow, extract all params, go directly to processing

PHOTO HANDLING:
If user sends an image message at any state:
→ download image from WhatsApp media URL
→ run OCR pipeline
→ ask which version they want
→ trigger generation with extracted text

RESET COMMANDS:
"new" | "reset" | "start" → reset session to greeting state
"same" → regenerate same chapter with opposite version type

REPLY FORMAT:
All bot messages use plain text (no markdown — WhatsApp renders * literally)
Emojis allowed and encouraged for warmth
```

---

## DOCUMENT GENERATION — HTML TEMPLATES

Three HTML templates live in backend/templates/.
Puppeteer renders each template to a print-ready A4 PDF.

### dyslexia.html — critical CSS rules
```css
body {
  font-family: 'Arial', 'Helvetica', sans-serif; /* No serif */
  font-size: 15px;
  line-height: 1.8;           /* Wide line spacing */
  letter-spacing: 0.05em;     /* Wide letter spacing */
  text-align: left;           /* Never justify */
  max-width: 60ch;            /* Max line length */
  background: #FFFEF7;        /* Cream, not pure white */
  color: #1A1A2E;
  margin: 40px auto;
  padding: 40px;
}
p { margin-bottom: 1.5em; }  /* Paragraph breathing room */
h2 { color: #1B5E8B; margin-top: 2em; }
.syllable { letter-spacing: 0.08em; }
.phonics-guide { font-size: 12px; color: #666; font-style: italic; }
```

### adhd.html — critical CSS rules
```css
.box { border-radius: 8px; padding: 16px; margin: 16px 0; }
.box.definition { background: #E8F4FD; border-left: 4px solid #1B5E8B; }
.box.example    { background: #EAF5EA; border-left: 4px solid #1E7E34; }
.box.remember   { background: #FEF5EC; border-left: 4px solid #E67E22; }
.box.tryit      { background: #F3E8FD; border-left: 4px solid #7B2FBE; }
.step { display: flex; gap: 12px; margin: 8px 0; align-items: flex-start; }
.step-num { font-weight: bold; color: #1B5E8B; min-width: 24px; }
.checkbox { width: 16px; height: 16px; border: 2px solid #1B5E8B;
            border-radius: 3px; flex-shrink: 0; margin-top: 2px; }
.fidget-break { background: #FFF3CD; border: 1px dashed #F39C12;
                padding: 12px; border-radius: 6px; margin: 20px 0;
                font-style: italic; }
```

---

## CACHING STRATEGY

Cache key: `${chapterId}_${versions.join('_')}_${language}`

- Check cache BEFORE any API call
- If cache hit: return cached result immediately (0 API cost)
- Cache TTL: 7 days for library chapters, 24 hours for uploaded content
- Use node-cache for in-memory (hackathon), Redis for production

The top 20 most-requested chapters should be pre-generated and
cached on server startup — these serve the majority of requests
at zero API cost.

---

## ERROR HANDLING RULES

1. If Stage 1 fails → return 500, do not proceed to Stage 2
2. If one Stage 2 call fails → return the two successful versions,
   mark the failed one as "unavailable", do not fail the entire request
3. If Stage 3 quality score < 0.80 for a version → still return the
   version but set flagged: true and include the flagged sections
4. If WhatsApp webhook fails to send PDF → log error, send text
   fallback: "Your worksheet is ready. Reply 'link' to get download URL."
5. All errors must be logged with: timestamp, route, error message,
   request body (sanitised — no API keys)
6. Never expose OpenAI API errors to the frontend response

---

## SECURITY RULES

- CORS: only allow requests from FRONTEND_URL in production
- WhatsApp webhook: always verify X-Hub-Signature-256 header
- File uploads: validate MIME type (PDF, JPEG, PNG only)
  max file size 10MB per image, 20MB for PDF
- Generated files: served via signed Supabase URLs (not public URLs)
- Rate limiting: 10 requests per IP per minute on /api/generate
- No student data stored anywhere — only chapter-level analytics
- Phone numbers in whatsapp_sessions stored as hashed values in production

---

## WHAT THE FRONTEND EXPECTS FROM THE BACKEND

The frontend (already built) makes these calls:

1. On chapter dropdown selection:
   GET /api/chapters?class={n}&subject={s}&language={l}

2. On Generate button click:
   POST /api/generate (with form data or JSON)
   → Frontend polls GET /api/jobs/:jobId every 2 seconds
   → OR backend streams progress events via SSE

3. On Download button click:
   GET /api/download/:fileId?format=pdf|docx&version=standard|dyslexia|adhd

4. Frontend sends Accept-Language header — backend should respect it
   for error message language

---

## NCERT CHAPTER DATA FORMAT

Each chapter in chapters.json follows this structure:

```json
{
  "id": "cls5-science-ch2",
  "class": 5,
  "subject": "Science",
  "chapterNum": 2,
  "title": "Components of Food",
  "language": "english",
  "sections": [
    {
      "heading": "What Do Different Foods Contain?",
      "content": "Food contains many nutrients...",
      "type": "text | list | procedure | definition"
    }
  ],
  "keyTerms": ["nutrients", "carbohydrates", "proteins"],
  "learningObjectives": [
    "Identify the main nutrients found in food",
    "Explain the role of each nutrient in the body"
  ],
  "estimatedReadingMinutes": 8
}
```

---

## DEPLOYMENT TARGETS

- Backend: Railway (Node.js native, free tier, auto-deploy from GitHub)
- Frontend: Vercel (already configured)
- Database: Supabase (already provisioned)
- File storage: Supabase Storage bucket named "generated-worksheets"

Railway start command: `node backend/server.js`
Port: process.env.PORT (Railway injects this automatically)

---

## HACKATHON DEMO CHAPTERS (pre-load these first)

These 5 chapters must work perfectly for the demo:
1. Class 5 Science Chapter 2 — Components of Food
2. Class 5 Science Chapter 3 — Fibre to Fabric
3. Class 6 Science Chapter 1 — Food: Where Does It Come From?
4. Class 5 Mathematics Chapter 1 — The Fish Tale
5. Class 4 English Chapter 1 — Wake Up!

Pre-generate all three versions of all 5 chapters on server startup
and cache them. Demo must never wait for API calls on these chapters.

---

## KNOWN CONSTRAINTS

- OpenAI API key has rate limits — implement retry with exponential backoff
- Puppeteer needs chromium — on Railway use puppeteer-core with
  @sparticuz/chromium package (Railway doesn't bundle Chromium)
- WhatsApp Cloud API free tier: 1000 conversations/month
- Supabase free tier: 500MB storage, 2GB bandwidth/month
- Meta webhook requires HTTPS — Railway provides this automatically
- PDF files average 200-400KB per version — budget storage accordingly

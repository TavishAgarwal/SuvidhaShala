# SuvidhaShala — सुविधाशाला

### The Accessible Classroom

> An AI-powered platform that transforms any Indian school
> textbook chapter into three parallel, print-ready versions —
> adapted for standard learners, children with dyslexia, and
> children with dyscalculia or ADHD.

Built for Indian government school teachers. Always free.
Aligned with NEP 2020, RPwD Act 2016, and RTE Act 2009.

---

## What It Does

SuvidhaShala takes any NCERT or state board chapter and generates:

- **Edition A — Standard**: Improved clarity, bold key terms,
  better structure for all learners
- **Edition B — Dyslexia-Friendly**: Syllable-broken words,
  short sentences, wide spacing, phonics guide, reading ruler
- **Edition C — ADHD / Dyscalculia**: Numbered micro-steps,
  checkbox progress, Definition / Example / Try It / Remember
  boxes, fidget break prompts

Three input channels:
- **NCERT Library**: 800+ pre-loaded chapters, Classes 1–8
- **PDF Upload**: Upload any textbook PDF
- **Camera Photo**: Photograph any textbook page — AI reads it

Two delivery channels:
- **Web App**: Three-panel side-by-side preview with PDF and
  DOCX download
- **WhatsApp Bot**: Send one message, receive the adapted PDF

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, TypeScript, Tailwind CSS v4 |
| Backend | Node.js, Express |
| AI | OpenAI GPT-4o (text + vision) |
| Database | PostgreSQL via Supabase |
| File Storage | Supabase Storage |
| PDF Generation | Puppeteer + @sparticuz/chromium |
| DOCX Generation | docx npm library |
| WhatsApp | Meta WhatsApp Business Cloud API |
| Frontend Hosting | Vercel |
| Backend Hosting | Railway |

---

## Project Structure

```
suvidha-shala/
├── frontend/          # React + Vite + TypeScript
│   ├── src/
│   │   ├── app/       # Pages and components
│   │   ├── lib/       # API client (api.ts)
│   │   └── styles/    # CSS and theme
│   └── index.html     # Vite entry point
├── backend/           # Node.js + Express
│   ├── routes/        # API endpoints
│   ├── services/      # AI pipeline, document gen, WhatsApp
│   ├── utils/         # Text extraction, image processing
│   ├── templates/     # PDF HTML templates
│   ├── middleware/     # Validation, security
│   └── scripts/       # Database seed
└── database/          # SQL schema
```

---

## Getting Started

### Prerequisites
- Node.js 20+
- A Supabase project
- An OpenAI API key (GPT-4o access required)
- A Meta WhatsApp Business Cloud API setup

### 1. Clone the repository

```bash
git clone https://github.com/TavishAgarwal/suvidha-shala.git
cd suvidha-shala
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Fill in all values in `.env`. See `.env.example` for descriptions
of each variable and where to obtain them.

### 3. Set up the database

Run the contents of `database/schema.sql` in your Supabase
SQL editor.

Create a Supabase Storage bucket named `generated-worksheets`
with private access (not public).

### 4. Install dependencies and seed the database

```bash
cd backend
npm install
node scripts/seedChapters.js
```

### 5. Run the backend

```bash
# Development
npm run dev

# Production
npm start
```

Backend runs on `http://localhost:3001`

### 6. Run the frontend

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## Environment Variables

See `.env.example` for the complete list. Key variables:

| Variable | Description |
|---|---|
| `OPENAI_API_KEY` | OpenAI API key with GPT-4o access |
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server only) |
| `WHATSAPP_PHONE_NUMBER_ID` | Meta WhatsApp phone number ID |
| `WHATSAPP_ACCESS_TOKEN` | Meta WhatsApp access token |
| `WHATSAPP_VERIFY_TOKEN` | Custom string for webhook verification |
| `WHATSAPP_APP_SECRET` | Meta App Secret for webhook signature |
| `FRONTEND_URL` | Frontend URL for CORS (e.g. https://your-app.vercel.app) |

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Health check |
| GET | `/api/chapters` | List NCERT chapters |
| GET | `/api/chapters/:id` | Get single chapter |
| POST | `/api/generate` | Generate adapted worksheets |
| GET | `/api/download/:jobId` | Download generated file |
| GET | `/webhook/whatsapp` | WhatsApp webhook verification |
| POST | `/webhook/whatsapp` | WhatsApp incoming messages |

---

## WhatsApp Bot Usage

Send a message to the registered WhatsApp number:

```
5 science 2 dyslexia
```

Format: `[class] [subject] [chapter] [version]`

Versions: `standard`, `dyslexia`, `adhd`, `both`

Or send a photo of any textbook page — the bot reads and
adapts it automatically.

---

## Deployment

**Backend → Railway**
Connect your GitHub repository to Railway. Set all environment
variables in the Railway dashboard. Railway auto-deploys on push.

**Frontend → Vercel**
Connect your GitHub repository to Vercel. Set
`VITE_API_URL` to your Railway backend URL.

---

## The AI Pipeline

Every generation runs a three-stage pipeline:

1. **Stage 1 — Analysis**: GPT-4o extracts learning objectives,
   technical vocabulary, and content structure
2. **Stage 2 — Adaptation**: Three concurrent GPT-4o calls
   generate all three versions simultaneously (~20 seconds)
3. **Stage 3 — Quality Check**: GPT-4o verifies every original
   learning objective is preserved in each adapted version

---

## Policy Alignment

- **NEP 2020**: Differentiated instruction mandate (Section 4.4)
- **RPwD Act 2016**: Inclusive education for learning disabilities
- **RTE Act 2009**: Free, inclusive schooling with appropriate support

---

## License

MIT License — see LICENSE file for details.

---

## Built for India

SuvidhaShala targets the most underserved segment of Indian
education — 8.2 million children with learning disabilities
receiving zero adapted content in government schools.

Free forever for government school teachers.

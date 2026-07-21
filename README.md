# Government Scheme Eligibility Checker (scheme.gov)

A production-ready, mobile-first web platform that helps Indian citizens discover government schemes, scholarships, subsidies, and welfare programs they are eligible for.

## Features

- **Multi-step eligibility form** with real-time validation, auto-save drafts, and voice input
- **Smart eligibility engine** matching profiles against JSON-based scheme rules
- **15+ government schemes** with full details, documents, and apply links
- **AI recommendations** (OpenRouter/Gemini) with local fallback
- **PDF eligibility report** download
- **English + Hindi** multilingual support
- **Dark mode**, bookmarks, notifications
- **Admin dashboard** for scheme management (local demo)
- **SEO optimized** with Open Graph, structured data, and semantic HTML
- **WCAG accessible** with skip links, ARIA labels, keyboard navigation

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Vite |
| Styling | Tailwind CSS v4, Shadcn UI patterns |
| Animation | Framer Motion |
| Forms | React Hook Form + Zod |
| i18n | i18next |
| Database | Supabase (optional) |
| PDF | jsPDF |
| Deploy | Vercel |

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173)

## Environment Variables

Copy `.env.example` to `.env.local`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
OPENAI_API_KEY=your-openai-api-key
OPENAI_MODEL=chat-latest
VITE_OPENROUTER_API_KEY=your-key   # optional legacy fallback
```

The chatbot uses local RAG retrieval first, then sends the retrieved scheme context to ChatGPT through `api/chatgpt.ts`. Keep `OPENAI_API_KEY` server-side. Do not expose it as a `VITE_` variable.

## Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI primitives (Button, Card, Input, etc.)
│   ├── layout/       # Header, Footer, Layout, PageHeader
│   ├── forms/        # EligibilityForm multi-step wizard
│   ├── schemes/      # SchemeCard component
│   └── home/         # StatsCounter, hero sections
├── contexts/         # Theme, Bookmarks, Notifications, Eligibility
├── data/             # schemes.ts dataset, states.ts
├── hooks/            # useVoiceInput
├── i18n/             # English + Hindi translations
├── lib/              # Eligibility engine, PDF, AI, Supabase, utils
├── pages/            # All route pages
└── types/            # TypeScript interfaces
```

## Pages

| Route | Page |
|-------|------|
| `/` | Home (hero, how it works, stats, schemes, FAQ) |
| `/check-eligibility` | Multi-step eligibility form |
| `/results` | Eligibility results with AI recommendations |
| `/schemes` | Searchable schemes listing |
| `/schemes/:slug` | Scheme detail page |
| `/about` | About page |
| `/contact` | Contact form |
| `/faq` | FAQ accordion |
| `/admin` | Admin dashboard |

## Eligibility Engine

Schemes define JSON rules that the engine evaluates:

```json
{
  "minAge": 18,
  "maxAge": 25,
  "incomeLimit": 300000,
  "categories": ["SC", "ST", "OBC"],
  "studentOnly": true
}
```

Results are ranked as **eligible**, **partial** (≥60% match), or filtered out.

## Supabase Setup

1. Create a free project at [supabase.com](https://supabase.com)
2. Run `supabase/schema.sql` in the SQL Editor
3. Add credentials to `.env.local`
4. Enable Row Level Security policies (included in schema)

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or connect your GitHub repo to [vercel.com](https://vercel.com). The included `vercel.json` handles SPA routing and cache headers.

### Vercel Environment Variables

Add the same variables from `.env.example` in the Vercel dashboard under **Settings → Environment Variables**.

## Performance

- Lazy-loaded routes with React Suspense
- Manual chunk splitting (vendor, ui, forms)
- Skeleton loading states
- Optimized for low-bandwidth mobile devices

## License

MIT — Built for educational and civic-tech purposes.

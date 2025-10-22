# Next.js and OpenAI Weather Playground

An interactive demonstration of Next.js rendering strategies (SSG, SSR, ISR, Edge) with real-time weather data and an AI-powered weather assistant chatbot.

## Features

- Compare performance characteristics of different Next.js rendering techniques
- Live weather data fetching with real-time metrics
- OpenAI-powered weather chat assistant
- Detailed explanations of pros/cons for each rendering strategy
- Performance monitoring with TTFB, DOM Ready, and Full Load metrics

## Project Structure

```
nextjs-weather-chat/
│
├── app/                              # Next.js 15 App Router directory
│   ├── api/                          # API routes
│   │   ├── chat/
│   │   │   └── route.ts              # OpenAI chat endpoint
│   │   │                             • Handles POST requests to OpenAI API (gpt-4o-mini)
│   │   │                             • Restricts responses to weather-related topics only
│   │   │                             • Returns AI-generated weather assistance with error handling
│   │   │
│   │   └── data/
│   │       └── route.ts              # Weather data API endpoint
│   │                                 • Fetches real weather data from Open-Meteo API
│   │                                 • Returns JSON with temperature, wind, location, and timestamp
│   │                                 • Used by all rendering strategy demo pages
│   │
│   ├── ssg/
│   │   └── page.tsx                  # Static Site Generation demo
│   │                                 • Pre-rendered at build time (revalidate = false)
│   │                                 • Fastest page loads, served from CDN
│   │                                 • Shows timestamp from build time, never updates until redeploy
│   │
│   ├── ssr/
│   │   └── page.tsx                  # Server-Side Rendering demo
│   │                                 • Rendered on-demand per request (dynamic = "force-dynamic")
│   │                                 • Always fresh data with current timestamp on every request
│   │                                 • Best for personalized or real-time content
│   │
│   ├── isr/
│   │   └── page.tsx                  # Incremental Static Regeneration demo
│   │                                 • Cached with 30-second revalidation period
│   │                                 • Balance between speed and freshness
│   │                                 • Background regeneration after cache expires
│   │
│   ├── edge/
│   │   └── page.tsx                  # Edge Function Rendering demo
│   │                                 • Runs on Vercel Edge Network (runtime = "edge")
│   │                                 • Low latency, executes near users globally
│   │                                 • Lightweight JavaScript runtime with limited Node.js APIs
│   │
│   ├── layout.tsx                    # Root layout component
│   │                                 • Defines global HTML structure and metadata
│   │                                 • Loads Geist Sans and Geist Mono font families
│   │                                 • Sets page title and description for SEO
│   │
│   ├── page.tsx                      # Homepage
│   │                                 • Displays four rendering strategy cards with color-coded borders
│   │                                 • Shows performance badges (Fastest, Dynamic, Balanced, Global)
│   │                                 • Includes Chat component at bottom
│   │
│   ├── globals.css                   # Global styles
│   │                                 • Tailwind CSS @layer directives
│   │                                 • Base styling and CSS custom properties
│   │
│   └── favicon.ico                   # Site favicon
│                                     • Browser tab icon
│
├── components/                       # Reusable React components
│   ├── Chat.tsx                      # Weather chatbot UI component
│   │                                 • Client-side chat interface with message history
│   │                                 • Sends messages to /api/chat and displays responses
│   │                                 • Auto-scrolling and loading states with animations
│   │
│   ├── DataCard.tsx                  # Weather data display card
│   │                                 • Shows location, temperature, and wind speed
│   │                                 • Displays render type and timestamp
│   │                                 • Reused by all four rendering demo pages
│   │
│   └── RenderInfo.tsx                # Rendering technique documentation
│                                     • Displays pros/cons comparison for each strategy
│                                     • Shows performance metrics (TTFB, DOM Ready, Full Load)
│                                     • Includes code snippets with explanations
│
├── lib/                              # Utility functions and helpers
│   └── fetchData.ts                  # Weather data fetching utility
│                                     • Fetches from Open-Meteo API (NYC coordinates)
│                                     • Returns structured data with current timestamp
│                                     • Includes error handling with fallback data
│
├── public/                           # Static assets (served as-is)
│   ├── file.svg                      # UI icon asset
│   ├── globe.svg                     # UI icon asset
│   ├── next.svg                      # Next.js logo
│   ├── vercel.svg                    # Vercel logo
│   └── window.svg                    # UI icon asset
│
├── .gitignore                        # Git ignore rules
│                                     • Excludes node_modules, .next, .env* files
│                                     • Prevents committing build artifacts and secrets
│
├── next-env.d.ts                     # Next.js TypeScript declarations
│                                     • Auto-generated by Next.js
│                                     • Provides TypeScript types for Next.js
│
├── next.config.ts                    # Next.js configuration
│                                     • Framework settings and build optimizations
│                                     • Currently uses default configuration
│
├── package.json                      # Project dependencies and scripts
│                                     • Next.js 15.5.5, React 19, OpenAI SDK
│                                     • Dev script uses Turbopack for faster development
│                                     • Build script uses standard Next.js compiler
│
├── package-lock.json                 # Locked dependency versions
│                                     • Ensures consistent installs across environments
│
├── postcss.config.mjs                # PostCSS configuration
│                                     • Configures Tailwind CSS processing
│                                     • Transforms CSS during build
│
├── tsconfig.json                     # TypeScript configuration
│                                     • Compiler options with strict type checking
│                                     • Path aliases (@/* points to project root)
│                                     • Module resolution settings for Next.js
│
└── vercel.json                       # Vercel deployment configuration
                                      • Explicitly sets framework to Next.js
                                      • Ensures correct build and install commands
                                      • Required for non-template deployments
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key ([get one here](https://platform.openai.com/api-keys))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/stevelerner/nextjs-weather-chat
   cd nextjs-weather-chat
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` file in the root directory:
   ```env
   OPENAI_API_KEY=your-openai-api-key-here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the project in Vercel
3. Set **Framework Preset** to "Next.js" in project settings
4. Add `OPENAI_API_KEY` environment variable in Vercel project settings
5. Deploy

**Note:** The `vercel.json` file ensures proper Next.js framework detection for blank deployments.

## Rendering Strategies Explained

### SSG (Static Site Generation)
- Pages built at compile time during deployment
- Served from CDN edge locations globally
- Best performance, no server processing needed

### SSR (Server-Side Rendering)
- Pages rendered on the server for each request
- Always fresh, dynamic data per visitor
- Higher latency, requires server resources

### ISR (Incremental Static Regeneration)
- Static pages with periodic background updates
- 30-second revalidation period in this demo
- Optimal balance of speed and freshness

### Edge (Edge Function Rendering)
- Runs on Vercel's global edge network
- Low latency from geographic proximity to users
- Limited Node.js API support (lightweight runtime)

## Tech Stack

- **Framework**: Next.js 15.5.5 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **AI**: OpenAI API (GPT-4o-mini)
- **Deployment**: Vercel

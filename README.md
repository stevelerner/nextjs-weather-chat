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
nextjs-boilerplate/
│
├── app/                              # Next.js 15 App Router directory
│   ├── api/                          # API routes
│   │   ├── chat/
│   │   │   └── route.ts              # OpenAI chat endpoint
│   │   │                             • Handles POST requests to OpenAI API
│   │   │                             • Restricts responses to weather-related topics
│   │   │                             • Returns AI-generated weather assistance
│   │   │
│   │   └── data/
│   │       └── route.ts              # Mock weather data API
│   │                                 • Provides sample weather data for demos
│   │                                 • Returns JSON with temperature, wind, location
│   │                                 • Used by all rendering strategy pages
│   │
│   ├── ssg/
│   │   └── page.tsx                  # Static Site Generation demo
│   │                                 • Pre-rendered at build time (revalidate = false)
│   │                                 • Fastest page loads, served from CDN
│   │                                 • Best for content that rarely changes
│   │
│   ├── ssr/
│   │   └── page.tsx                  # Server-Side Rendering demo
│   │                                 • Rendered on-demand per request (dynamic = "force-dynamic")
│   │                                 • Always fresh data, higher server load
│   │                                 • Best for personalized or frequently changing content
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
│   │                                 • Lightweight JavaScript runtime
│   │
│   ├── layout.tsx                    # Root layout component
│   │                                 • Defines global HTML structure
│   │                                 • Loads Geist font families
│   │                                 • Sets metadata for SEO
│   │
│   ├── page.tsx                      # Homepage
│   │                                 • Displays rendering strategy cards
│   │                                 • Shows Chat component at bottom
│   │                                 • Links to each demo page
│   │
│   ├── globals.css                   # Global styles
│   │                                 • Tailwind CSS directives
│   │                                 • Base styling and CSS variables
│   │
│   └── favicon.ico                   # Site favicon
│
├── components/                       # Reusable React components
│   ├── Chat.tsx                      # Weather chatbot UI
│   │                                 • Client-side chat interface with OpenAI
│   │                                 • Message history and real-time responses
│   │                                 • Weather-focused conversation assistant
│   │
│   ├── DataCard.tsx                  # Weather data display card
│   │                                 • Shows location, temperature, wind speed
│   │                                 • Displays render type and timestamp
│   │                                 • Used by all rendering demo pages
│   │
│   └── RenderInfo.tsx                # Rendering technique documentation
│                                     • Displays pros/cons for each strategy
│                                     • Shows performance metrics (TTFB, DOM Ready, etc.)
│                                     • Includes code snippets and explanations
│
├── lib/                              # Utility functions and helpers
│   └── fetchData.ts                  # Data fetching utility
│                                     • Fetches weather data from /api/data
│                                     • Used by all rendering strategy pages
│                                     • Returns structured weather data
│
├── public/                           # Static assets
│   ├── *.svg                         # Icon assets
│                                     • Vercel, Next.js logos and UI icons
│                                     • Served directly without processing
│
├── middleware.ts                     # Next.js middleware
│                                     • Runs before request completion
│                                     • Can modify requests/responses
│                                     • Currently minimal implementation
│
├── package.json                      # Project dependencies
│                                     • Next.js 15.5.5, React 19
│                                     • OpenAI SDK for chat functionality
│                                     • Tailwind CSS for styling
│
├── tsconfig.json                     # TypeScript configuration
│                                     • Compiler options and path aliases
│                                     • Enables strict type checking
│                                     • Configures module resolution
│
├── next.config.ts                    # Next.js configuration
│                                     • Framework settings and optimizations
│                                     • Build and runtime configurations
│
└── postcss.config.mjs                # PostCSS configuration
                                      • Tailwind CSS processing
                                      • CSS transformation pipeline
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key ([get one here](https://platform.openai.com/api-keys))

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd nextjs-boilerplate
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
3. Add `OPENAI_API_KEY` environment variable in Vercel project settings
4. Deploy

## Rendering Strategies Explained

### SSG (Static Site Generation)
- Pages built at compile time
- Served from CDN edge locations
- Best performance, no server processing

### SSR (Server-Side Rendering)
- Pages rendered on each request
- Always fresh, dynamic data
- Higher latency, more server resources

### ISR (Incremental Static Regeneration)
- Static pages with periodic updates
- Background regeneration after revalidation period
- Balance of speed and freshness

### Edge (Edge Function Rendering)
- Runs on edge nodes globally
- Low latency from geographic proximity
- Lightweight runtime environment

## Tech Stack

- **Framework**: Next.js 15.5.5 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **AI**: OpenAI API (GPT-4o-mini)
- **Deployment**: Vercel
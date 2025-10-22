"use client";

import { useEffect, useState } from "react";

type RenderInfoProps = {
  technique: "SSG" | "SSR" | "ISR" | "Edge";
  renderTime: string;
};

type TechniqueInfo = {
  title: string;
  description: string;
  pros: string[];
  cons: string[];
  color: string;
  bgColor: string;
  code: string;
  filePath: string;
  codeExplanation: string[];
};

const renderingInfo: Record<"SSG" | "SSR" | "ISR" | "Edge", TechniqueInfo> = {
  SSG: {
    title: "Static Site Generation (SSG)",
    description:
      "Pages are pre-rendered at build time and served as static HTML. This is the fastest option as pages are generated once and cached on the CDN.",
    pros: [
      "Fastest page loads - served directly from CDN",
      "Best SEO - content is immediately available",
      "Reduced server load - no runtime computation",
      "Highly scalable - can handle massive traffic",
    ],
    cons: [
      "Content is stale until next build",
      "Build time increases with page count",
      "Not suitable for frequently changing data",
      "Requires rebuild to update content",
    ],
    color: "border-green-500",
    bgColor: "bg-green-50",
    filePath: "app/ssg/page.tsx",
    code: `export const revalidate = false;

export default async function Page() {
  const data = await fetchData();
  return <DataCard data={data} />;
}`,
    codeExplanation: [
      "revalidate = false disables revalidation, making this pure static generation",
      "Page is built once during deployment and never regenerated",
      "fetchData() runs at build time, not on user requests",
    ],
  },
  SSR: {
    title: "Server-Side Rendering (SSR)",
    description:
      "Pages are rendered on-demand for each request on the server. This ensures fresh data on every page load but requires server computation time.",
    pros: [
      "Always fresh data on every request",
      "Dynamic content per user/request",
      "Good for personalized content",
      "SEO-friendly with dynamic data",
    ],
    cons: [
      "Slower than static - requires server processing",
      "Higher server load and costs",
      "Depends on server response time",
      "Can't be cached on CDN effectively",
    ],
    color: "border-blue-500",
    bgColor: "bg-blue-50",
    filePath: "app/ssr/page.tsx",
    code: `export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page() {
  await headers(); // Forces dynamic rendering
  const data = await fetchData();
  return <DataCard data={data} />;
}`,
    codeExplanation: [
      "dynamic = 'force-dynamic' prevents static optimization",
      "revalidate = 0 ensures no caching between requests",
      "Calling headers() guarantees fresh server-side render every time",
    ],
  },
  ISR: {
    title: "Incremental Static Regeneration (ISR)",
    description:
      "Combines the best of SSG and SSR. Pages are statically generated but can be regenerated in the background after a specified time interval.",
    pros: [
      "Fast like static pages",
      "Content stays relatively fresh",
      "Automatic background regeneration",
      "Best balance of speed and freshness",
    ],
    cons: [
      "First visitor after revalidation sees stale data",
      "Slightly more complex caching behavior",
      "Revalidation timing needs tuning",
      "May serve stale content temporarily",
    ],
    color: "border-purple-500",
    bgColor: "bg-purple-50",
    filePath: "app/isr/page.tsx",
    code: `export const revalidate = 30;

export default async function Page() {
  const data = await fetchData();
  return <DataCard data={data} />;
}`,
    codeExplanation: [
      "revalidate = 30 sets cache lifetime to 30 seconds",
      "Serves cached version for 30s after first request",
      "After cache expires, next visitor triggers background regeneration while seeing cached content",
    ],
  },
  Edge: {
    title: "Edge Function Rendering",
    description:
      "Code runs on edge nodes closest to the user worldwide. Provides low-latency dynamic rendering with global distribution.",
    pros: [
      "Low latency - runs near users globally",
      "Fast dynamic rendering",
      "Scalable across regions",
      "Reduced backend server load",
    ],
    cons: [
      "Limited runtime environment",
      "Cold start latency possible",
      "Debugging can be more complex",
      "Some Node.js APIs unavailable",
    ],
    color: "border-orange-500",
    bgColor: "bg-orange-50",
    filePath: "app/edge/page.tsx",
    code: `export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function Page() {
  await headers(); // Forces dynamic rendering
  const data = await fetchData();
  return <DataCard data={data} />;
}`,
    codeExplanation: [
      "runtime = 'edge' deploys this function to Vercel's global edge network",
      "Executes on CDN nodes closest to users worldwide for minimal latency",
      "Combines edge performance with dynamic rendering capabilities",
    ],
  },
};

export default function RenderInfo({ technique, renderTime }: RenderInfoProps) {
  const [perfMetrics, setPerfMetrics] = useState<{
    ttfb: number | null;
    domContentLoaded: number | null;
    loadComplete: number | null;
  }>({
    ttfb: null,
    domContentLoaded: null,
    loadComplete: null,
  });
  const info = renderingInfo[technique];

  useEffect(() => {
    // Get performance metrics from Navigation Timing API
    const getMetrics = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        setPerfMetrics({
          ttfb: Math.round(navigation.responseStart - navigation.requestStart),
          domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart),
          loadComplete: Math.round(navigation.loadEventEnd - navigation.fetchStart),
        });
      }
    };

    // Wait for page to fully load before measuring
    if (document.readyState === 'complete') {
      getMetrics();
    } else {
      window.addEventListener('load', getMetrics);
      return () => window.removeEventListener('load', getMetrics);
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-6">
      <div className={`border-l-4 ${info.color} bg-white rounded-xl shadow-sm p-6 space-y-4`}>
        <div>
          <h2 className="text-2xl font-bold mb-2">{info.title}</h2>
          <p className="text-slate-700">{info.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className={`${info.bgColor} p-4 rounded-lg border`}>
            <h3 className="font-semibold text-green-900 mb-2 flex items-center">
              <span className="mr-2">✓</span> Pros
            </h3>
            <ul className="space-y-1 text-sm text-slate-700">
              {info.pros.map((pro, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 text-green-600">•</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border">
            <h3 className="font-semibold text-slate-900 mb-2 flex items-center">
              <span className="mr-2">⚠</span> Cons
            </h3>
            <ul className="space-y-1 text-sm text-slate-700">
              {info.cons.map((con, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 text-slate-400">•</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-lg border">
          <h3 className="font-semibold text-slate-900 mb-3">Performance Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-slate-600 text-xs uppercase mb-1">Server Rendered</p>
              <p className="font-mono font-semibold text-lg">{renderTime}</p>
            </div>
            <div>
              <p className="text-slate-600 text-xs uppercase mb-1">TTFB</p>
              <p className="font-mono font-semibold text-lg">
                {perfMetrics.ttfb !== null ? `${perfMetrics.ttfb}ms` : "measuring..."}
              </p>
            </div>
            <div>
              <p className="text-slate-600 text-xs uppercase mb-1">DOM Ready</p>
              <p className="font-mono font-semibold text-lg">
                {perfMetrics.domContentLoaded !== null ? `${perfMetrics.domContentLoaded}ms` : "measuring..."}
              </p>
            </div>
            <div>
              <p className="text-slate-600 text-xs uppercase mb-1">Full Load</p>
              <p className="font-mono font-semibold text-lg">
                {perfMetrics.loadComplete !== null ? `${perfMetrics.loadComplete}ms` : "measuring..."}
              </p>
            </div>
          </div>
          <div className="mt-3 text-xs text-slate-600">
            <p><strong>TTFB:</strong> Time to First Byte (server response time)</p>
            <p><strong>DOM Ready:</strong> Time until DOM content is loaded and parsed</p>
            <p><strong>Full Load:</strong> Complete page load including all resources</p>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-lg border">
          <h3 className="font-semibold text-slate-900 mb-3">Implementation Code</h3>
          <div className="mb-2 flex items-center text-sm">
            <span className="text-slate-600">File:</span>
            <code className="ml-2 px-2 py-1 bg-slate-200 rounded text-slate-800 font-mono">
              {info.filePath}
            </code>
          </div>
          <div className="bg-slate-900 text-slate-100 p-4 rounded-md overflow-x-auto">
            <pre className="text-sm font-mono leading-relaxed">
              <code className="whitespace-pre">{info.code}</code>
            </pre>
          </div>
          <div className="mt-3 space-y-2">
            <p className="font-semibold text-sm text-slate-900">Key Configuration:</p>
            <ul className="space-y-1.5 text-sm text-slate-700">
              {info.codeExplanation.map((explanation, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 text-blue-500 font-bold">→</span>
                  <span>{explanation}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center">
        <a
          href="/"
          className="inline-block px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition"
        >
          ← Back to Home
        </a>
      </div>
    </div>
  );
}


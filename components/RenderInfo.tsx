"use client";

import { useEffect, useState } from "react";

type RenderInfoProps = {
  technique: "SSG" | "SSR" | "ISR" | "Edge";
  renderTime: string;
};

const renderingInfo = {
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
  },
};

export default function RenderInfo({ technique, renderTime }: RenderInfoProps) {
  const [clientRenderTime, setClientRenderTime] = useState<number | null>(null);
  const info = renderingInfo[technique];

  useEffect(() => {
    // Measure time to hydrate/render on client
    const startTime = performance.now();
    setClientRenderTime(performance.now() - startTime);
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-slate-600 text-xs uppercase mb-1">Server Render</p>
              <p className="font-mono font-semibold text-lg">{renderTime}</p>
            </div>
            <div>
              <p className="text-slate-600 text-xs uppercase mb-1">Hydration Time</p>
              <p className="font-mono font-semibold text-lg">
                {clientRenderTime !== null ? `${clientRenderTime.toFixed(2)}ms` : "measuring..."}
              </p>
            </div>
            <div>
              <p className="text-slate-600 text-xs uppercase mb-1">Render Type</p>
              <p className="font-semibold text-lg">{technique}</p>
            </div>
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


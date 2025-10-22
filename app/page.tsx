import Link from "next/link";
import Chat from "@/components/Chat";

const pages = [
  { 
    name: "SSG", 
    path: "/ssg", 
    desc: "Static Site Generation (build-time)",
    performance: "Fastest",
    color: "border-l-4 border-l-green-500"
  },
  { 
    name: "SSR", 
    path: "/ssr", 
    desc: "Server-Side Rendering (on-demand)",
    performance: "Dynamic",
    color: "border-l-4 border-l-blue-500"
  },
  { 
    name: "ISR", 
    path: "/isr", 
    desc: "Incremental Static Regeneration (revalidate)",
    performance: "Balanced",
    color: "border-l-4 border-l-purple-500"
  },
  { 
    name: "Edge", 
    path: "/edge", 
    desc: "Edge Function Rendering (low latency)",
    performance: "Global",
    color: "border-l-4 border-l-orange-500"
  },
];

export default function Page() {
  return (
    <div className="space-y-12 pb-8">
      <div className="max-w-3xl mx-auto p-8 space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-bold mb-2">Next.js and OpenAI Weather Playground</h1>
          <p className="text-slate-600">
            Explore Next.js rendering strategies and AI-powered weather chat.
          </p>
        </header>

        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Rendering Strategy Demos</h2>
          <p className="text-slate-600 text-sm">Compare performance characteristics of different Next.js rendering techniques</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pages.map((p) => (
            <Link key={p.path} href={p.path}>
              <div className={`p-6 border rounded-xl hover:shadow-lg transition bg-white cursor-pointer ${p.color}`}>
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold">{p.name}</h2>
                  <span className="text-xs font-medium px-2 py-1 bg-slate-100 rounded-full text-slate-700">
                    {p.performance}
                  </span>
                </div>
                <p className="text-slate-600 text-sm">{p.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Chat />
    </div>
  );
}

import Link from "next/link";
import Chat from "@/components/Chat";

const pages = [
  { name: "SSG", path: "/ssg", desc: "Static Site Generation (build-time)" },
  { name: "SSR", path: "/ssr", desc: "Server-Side Rendering (on-demand)" },
  { name: "ISR", path: "/isr", desc: "Incremental Static Regeneration (revalidate)" },
  { name: "Edge", path: "/edge", desc: "Edge Function Rendering (low latency)" },
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pages.map((p) => (
            <Link key={p.path} href={p.path}>
              <div className="p-6 border rounded-xl hover:shadow-lg transition bg-white cursor-pointer">
                <h2 className="text-xl font-semibold mb-1">{p.name}</h2>
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

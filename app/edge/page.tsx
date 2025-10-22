import { fetchData } from "@/lib/fetchData";
import DataCard from "@/components/DataCard";
import RenderInfo from "@/components/RenderInfo";
import { headers } from "next/headers";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function Page() {
  // Force fresh render by accessing headers
  await headers();
  const data = await fetchData();
  return (
    <div className="space-y-8 pb-8">
      <div className="max-w-3xl mx-auto p-8">
        <DataCard title="Edge Rendering" data={data} renderType="Edge Function" />
      </div>
      <RenderInfo technique="Edge" renderTime={data.time} />
    </div>
  );
}

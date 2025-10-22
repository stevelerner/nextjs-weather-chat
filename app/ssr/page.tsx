import { fetchData } from "@/lib/fetchData";
import DataCard from "@/components/DataCard";
import RenderInfo from "@/components/RenderInfo";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page() {
  // Force fresh render by accessing headers
  await headers();
  const data = await fetchData();
  return (
    <div className="space-y-8 pb-8">
      <div className="max-w-3xl mx-auto p-8">
        <DataCard title="Server-Side Rendering (SSR)" data={data} renderType="Server runtime" />
      </div>
      <RenderInfo technique="SSR" renderTime={data.time} />
    </div>
  );
}

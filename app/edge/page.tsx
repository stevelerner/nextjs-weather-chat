import { fetchData } from "@/lib/fetchData";
import DataCard from "@/components/DataCard";
import RenderInfo from "@/components/RenderInfo";

export const runtime = "edge";

export default async function Page() {
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

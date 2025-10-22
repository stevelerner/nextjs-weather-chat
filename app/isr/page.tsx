import { fetchData } from "@/lib/fetchData";
import DataCard from "@/components/DataCard";
import RenderInfo from "@/components/RenderInfo";

export const revalidate = 30;

export default async function Page() {
  const startTime = performance.now();
  const data = await fetchData();
  const serverDuration = performance.now() - startTime;
  
  return (
    <div className="space-y-8 pb-8">
      <div className="max-w-3xl mx-auto p-8">
        <DataCard title="Incremental Static Regeneration (ISR)" data={data} renderType="Cached (30s)" />
      </div>
      <RenderInfo 
        technique="ISR" 
        renderTime={data.time}
        serverDuration={serverDuration}
      />
    </div>
  );
}

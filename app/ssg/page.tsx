import { fetchData } from "@/lib/fetchData";
import DataCard from "@/components/DataCard";
import RenderInfo from "@/components/RenderInfo";

export const revalidate = false;

export default async function Page() {
  const data = await fetchData();
  return (
    <div className="space-y-8 pb-8">
      <div className="max-w-3xl mx-auto p-8">
        <DataCard title="Static Site Generation (SSG)" data={data} renderType="Build-time" />
      </div>
      <RenderInfo technique="SSG" renderTime={data.time} />
    </div>
  );
}

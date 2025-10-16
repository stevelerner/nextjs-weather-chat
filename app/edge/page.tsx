import { fetchData } from "@/lib/fetchData";
import DataCard from "@/components/DataCard";

export const runtime = "edge";

export default async function Page() {
  const data = await fetchData();
  return <DataCard title="Edge Rendering" data={data} renderType="Edge Function" />;
}

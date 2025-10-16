import { fetchData } from "@/lib/fetchData";
import DataCard from "@/components/DataCard";

export const revalidate = 30;

export default async function Page() {
  const data = await fetchData();
  return <DataCard title="Incremental Static Regeneration (ISR)" data={data} renderType="Cached (30s)" />;
}

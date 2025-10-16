import { fetchData } from "@/lib/fetchData";
import DataCard from "@/components/DataCard";

export const dynamic = "force-dynamic";

export default async function Page() {
  const data = await fetchData();
  return <DataCard title="Server-Side Rendering (SSR)" data={data} renderType="Server runtime" />;
}

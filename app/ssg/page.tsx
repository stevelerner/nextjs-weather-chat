import { fetchData } from "@/lib/fetchData";
import DataCard from "@/components/DataCard";

export const revalidate = false;

export default async function Page() {
  const data = await fetchData();
  return <DataCard title="Static Site Generation (SSG)" data={data} renderType="Build-time" />;
}

export default function DataCard({
  title,
  data,
  renderType,
}: {
  title: string;
  data: { time: string; temp: string | number; wind: string | number; location: string };
  renderType: string;
}) {
  return (
    <div className="p-6 border rounded-xl shadow-sm bg-white space-y-3">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-slate-600">Rendered via {renderType}</p>
      <div className="bg-slate-50 p-4 rounded-md border">
        <p>
          <strong>Location:</strong> {data.location}
        </p>
        <p>
          <strong>Temperature:</strong> {data.temp}°C
        </p>
        <p>
          <strong>Wind Speed:</strong> {data.wind} km/h
        </p>
        <p className="text-xs text-slate-500">Rendered at: {data.time}</p>
      </div>
    </div>
  );
}

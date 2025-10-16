export async function fetchData() {
  const lat = 40.7128;
  const lon = -74.006; // NYC coordinates

  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await res.json();

    return {
      time: new Date().toISOString(),
      temp: data.current_weather.temperature,
      wind: data.current_weather.windspeed,
      location: "New York City, NY",
    };
  } catch (err) {
    return {
      time: new Date().toISOString(),
      temp: "Unavailable",
      wind: "Unavailable",
      location: "New York City, NY",
    };
  }
}

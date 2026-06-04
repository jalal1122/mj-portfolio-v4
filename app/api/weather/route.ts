import { NextResponse } from "next/server";

export const revalidate = 1800; // Cache for 30 minutes (1800 seconds)

export async function GET() {
  try {
    // Peshawar coordinates
    const lat = 34.0086;
    const lon = 71.5785;
    
    // Open-Meteo API (Free, no key required)
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Weather API returned status: ${response.status}`);
    }
    
    const data = await response.json();
    const temp = Math.round(data.current.temperature_2m);
    
    return NextResponse.json({
      temperature: `${temp}°C`,
      condition: "Clear", // Simplified for now
    });
  } catch (error) {
    console.error("Failed to fetch weather:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}

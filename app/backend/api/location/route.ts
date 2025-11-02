import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json(
      { error: "Latitude ou longitude obrigatórias" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      {
        headers: {
          "User-Agent": "ClimaSmart",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao consultar Nominatim");
    }

    const data = await response.json();

    const location = {
      city:
        data.address.city ||
        data.address.town ||
        data.address.village ||
        "Desconhecida",
      state: data.address.state || "Desconhecido",
      country: data.address.country || "Desconhecido",
      latitude: parseFloat(lat),
      longitude: parseFloat(lon),
    };

    return NextResponse.json(location);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao obter localização" },
      { status: 500 }
    );
  }
}

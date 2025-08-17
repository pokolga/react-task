import { NextResponse } from "next/server";
import { getMultipleCharacters } from "../../services/fetch";

export async function POST(req: Request) {
  const { ids } = await req.json();

  if (!Array.isArray(ids) || ids.length === 0) {
    return new NextResponse("No IDs provided", { status: 400 });
  }

  const characters = await getMultipleCharacters(ids.join(","));

  if (!Array.isArray(characters) || characters.length === 0) {
    return new NextResponse("No data found", { status: 404 });
  }

  const csvData = characters.map((item) => ({
    ID: item.id,
    name: item.name,
    status: item.status,
    species: item.species,
    image: item.image,
  }));

  const headers = Object.keys(csvData[0]).join(",") + "\n";
  const rows = csvData.map((row) => Object.values(row).join(",")).join("\n");
  const csvContent = headers + rows;

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="${csvData.length}_items.csv"`,
    },
  });
}

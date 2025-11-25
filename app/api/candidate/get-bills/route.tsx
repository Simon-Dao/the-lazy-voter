import { NextResponse } from "next/server";
import axios from "axios";
import { CONGRESS_API_BASE_URL } from "@/state/Constants";
import { getJSON, setCache } from "@/app/lib/cache";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const congressId = searchParams.get("congressId");
  const noLimit = searchParams.get("noLimit") || false;
  const url = `${CONGRESS_API_BASE_URL}/v3/member/${congressId}/sponsored-legislation?api_key=${process.env.NEXT_PUBLIC_CONGRESS_API_KEY}&limit=250`;
  try {
    const cachedResult = await getJSON(url);
    if (cachedResult) {
      return cachedResult;
    }
    let [allData, totalCount] = await getData(url, 0);

    // Fetch remaining pages (we already fetched offset 0)
    for (let offset = 250; offset < totalCount; offset += 250) {
      const [data] = await getData(url, offset);
      allData = allData.concat(data);
    }

    return NextResponse.json({ data: allData }, { status: 200 });
  } catch (error) {
    console.error("Error fetching candidate data:", error);
    return NextResponse.json(
      { error: "Failed to fetch candidate data" },
      { status: 500 }
    );
  }
}

async function getData(url: string, offset: number) {
  const response = await axios.get(url+"&offset="+offset, {});
  const dataToCache = response.data.sponsoredLegislation || [];
  const count = response.data.pagination?.count ?? 0;
  return [dataToCache, count];
}
import { NextResponse } from 'next/server';
import axios from 'axios';
import { CONGRESS_API_BASE_URL } from '@/state/Constants';

export async function GET(request: Request) {

  return await getBillsFromCongressId(request)
}

export async function getBillsFromCongressId(request: Request) {

  const { searchParams } = new URL(request.url);
  const congressId = searchParams.get('congressId');

  try {
    const response = await axios.get(`${CONGRESS_API_BASE_URL}/v3/member/${congressId}/sponsored-legislation`, {
      params: {
        api_key: process.env.NEXT_PUBLIC_CONGRESS_API_KEY,
        limit: 250
      },
    });

    return NextResponse.json({ candidate: response.data.sponsoredLegislation }, { status: 200 });

  } catch (error) {
    console.error('Error fetching candidate data:', error);
    return NextResponse.json({ error: 'Failed to fetch candidate data' }, { status: 500 });
  }
}

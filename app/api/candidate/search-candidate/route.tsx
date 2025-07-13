import { NextResponse } from 'next/server';
import axios from 'axios';
import { FEC_API_BASE_URL } from '@/state/Constants';

export async function GET(request: Request) {

  return await searchCandidates(request)
}

export async function searchCandidates(request: Request) {

  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');

  try {
    const response = await axios.get(`${FEC_API_BASE_URL}/v1/candidates/search`, {
      params: {
        q: name,
        api_key: process.env.NEXT_PUBLIC_OPEN_FEC_API_KEY,
      },
    });

    const candidates = response.data;

    if (!candidates) {
      return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });
    }

    return NextResponse.json({ candidates: candidates.results }, { status: 200 });

  } catch (error) {
    console.error('Error fetching candidate data:', error);
    return NextResponse.json({ error: 'Failed to fetch candidate data' }, { status: 500 });
  }
}

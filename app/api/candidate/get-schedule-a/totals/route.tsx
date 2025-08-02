import { NextResponse } from "next/server";
import axios from "axios";
import { FEC_API_BASE_URL } from "@/state/Constants";
import { getCommittees } from "../../get-committees/route";
import { get } from "http";

export async function GET(request: Request) {
    return await getTotals(request);
}

export async function getTotals(request: Request) {
    const { searchParams } = new URL(request.url);
    
    if (!searchParams.has("candidate_id")) {
        return NextResponse.json({ error: "candidate_id is required" }, { status: 400 });
    }
    if (!searchParams.has("cycle")) {
        return NextResponse.json({ error: " is required" }, { status: 400 });
    }

    const response = await axios.get(`https://api.open.fec.gov/v1/candidate/${searchParams.get("candidate_id")}/totals/`, {
    params: {
        api_key: process.env.NEXT_PUBLIC_OPEN_FEC_API_KEY,
        election_full: true,
        cycle: searchParams.get("cycle"),
    }
    });

    const totals = response.data.results;
    console.log(totals);

    return NextResponse.json({ totals, status: 200 });
}
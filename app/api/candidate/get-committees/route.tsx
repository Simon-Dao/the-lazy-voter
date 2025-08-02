import { NextResponse } from "next/server";
import axios from "axios";
import { FEC_API_BASE_URL } from "@/state/Constants";
import { getCandidateIdFromName } from "@/app/api/candidate/get-id/route";

export async function GET(request: Request) {
    return await getCommittees(request);
}

export async function getCommittees(request: Request) {

    const { searchParams } = new URL(request.url);
    
    if (!searchParams.has("candidate_id")) {
        return NextResponse.json({ error: "candidate_id is required" }, { status: 400 });
    }

    const candidate_id = searchParams.get("candidate_id")

    try {

        const response = await axios.get(
            `${FEC_API_BASE_URL}/v1/candidate/${candidate_id}/committees`,
            {
                params: {
                    api_key: process.env.NEXT_PUBLIC_OPEN_FEC_API_KEY,
                },
            }
        );

        const committees = response.data;

        if (!committees) {
            return NextResponse.json(
                { error: "Schedule A not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ committees }, { status: 200 });
    } catch (error) {
        console.error("Error fetching candidate data:", error);
        return NextResponse.json(
            { error: "Failed to fetch candidate data" },
            { status: 500 }
        );
    }
}

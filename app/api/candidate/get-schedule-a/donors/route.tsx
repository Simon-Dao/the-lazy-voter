import { NextResponse } from "next/server";
import axios from "axios";
import { FEC_API_BASE_URL } from "@/state/Constants";
import { getCommittees } from "../../get-committees/route";

export async function GET(request: Request) {
    return await getDonors(request);
}

export async function getDonors(request: Request) {
    const { searchParams } = new URL(request.url);

    const candidate_id = searchParams.get("candidate_id");
    const transaction_year = searchParams.get("two_year_transaction_period");

    if (!candidate_id || !transaction_year) {
        return NextResponse.json({ error: "candidate_id and two_year_transaction_period are required" }, { status: 400 });
    }

    const donors: any[] = [];

    const committeeResponse = await getCommittees(request);
    const committeeResponseJson = await committeeResponse.json();
    const committees = committeeResponseJson.committees.results;

    for (const committee of committees) {
        const scheduleAResponse = await axios.get(`${FEC_API_BASE_URL}/v1/schedules/schedule_a/`, {
            params: {
                committee_id: committee.committee_id,
                two_year_transaction_period: transaction_year,
                per_page: 50,
                sort: "-contribution_receipt_amount",
                api_key: process.env.NEXT_PUBLIC_OPEN_FEC_API_KEY
            }
        });

        donors.push(...scheduleAResponse.data.results);
    }

    return NextResponse.json({ donors, status: 200 });
}
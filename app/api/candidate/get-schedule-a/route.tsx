import { NextResponse } from "next/server";
import axios from "axios";
import { FEC_API_BASE_URL } from "@/state/Constants";
import { getCandidateIdFromName } from "@/app/api/candidate/get-id/route";
import { getCommittees } from "../get-committees/route";
import { get } from "http";

export async function GET(request: Request) {
    return await getScheduleA(request);
}

export async function getScheduleA(request: Request) {
    const { searchParams } = new URL(request.url);

    let candidate_id = null;
    try {
        const res = await getCandidateIdFromName(request);
        const data = await res.json();
        candidate_id = data.candidate_id;
    } catch (error) {
        console.error("Error fetching candidate id:", error);
        return NextResponse.json(
            { error: "Failed to fetch candidate id" },
            { status: 500 }
        );
    }

    if (!candidate_id) {
        return NextResponse.json(
            { error: "A valid candidate ID is required" },
            { status: 400 }
        );
    }

    let committees = [];
    try {
        const response = await getCommittees(request);
        let committeesData = await response.json();

        committees = committeesData.committees.results;
    } catch (error) {
        console.error("Error fetching committees:", error);
        return NextResponse.json(
            { error: "Failed to fetch candidate committees" },
            { status: 500 }
        );
    }

    const doners = await getDoners(committees);

    if (!Array.isArray(doners)) {
        console.error("Error fetching donor data:", doners);
        return NextResponse.json(
            { error: "Failed to fetch candidate donations" },
            { status: 500 }
        );
    } else {
        //sort doners by date
        doners.forEach((doner) => {
            doner.schedule_a.sort(
                (a, b) =>
                    new Date(b.contribution_date).getTime() -
                    new Date(a.contribution_date).getTime()
            );
        });
    }

    return NextResponse.json({ doners, status: 200 });
}

async function getDoners(committees: any[]) {
    let doners: {
        committee_id: string;
        schedule_a: {
            contributor_name: string;
            contribution_date: string;
            contribution_amount: number;
        }[];
    }[] = [];
    for (let i = 0; i < committees.length; i++) {
        let committee = committees[i];

        try {
            const response = await axios.get(
                `${FEC_API_BASE_URL}/v1/schedules/schedule_a/`,
                {
                    params: {
                        committee_id: committee.committee_id,
                        sort: "-contribution_receipt_amount",
                        per_page: 100,
                        api_key: process.env.NEXT_PUBLIC_OPEN_FEC_API_KEY,
                    },
                }
            );

            const schedule_a = response.data.results.map((d: any) => ({
                contributor_name: d.contributor?.name || "Unknown",
                contribution_date: d.contribution_receipt_date,
                contribution_amount: d.contribution_receipt_amount,
            }));

            doners.push({
                committee_id: committee.committee_id,
                schedule_a,
            });
        } catch (error) {
            console.error("Error fetching donor data:", error);
            return NextResponse.json(
                { error: "Failed to fetch candidate donations" },
                { status: 500 }
            );
        }
    }

    return doners;
}

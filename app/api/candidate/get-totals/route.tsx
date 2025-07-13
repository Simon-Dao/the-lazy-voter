// import { NextResponse } from "next/server";
// import axios from "axios";
// import { FEC_API_BASE_URL } from "@/state/Constants";
// import { getCandidateFromName } from "@/app/api/candidate/get-candidate/route";
// import { getCommittees } from "../get-committees/route";
// import { get } from "http";

// export async function GET(request: Request) {
//     return await getTotals(request);
// }

// export async function getTotals(request: Request) {

//     let candidate = null;
//     try {
//         const res = await getCandidateFromName(request);
//         const data = await res.json();
//         candidate = data.candidate;
//     } catch (error) {
//         console.error("Error fetching candidate:", error);
//         return NextResponse.json(
//             { error: "Failed to fetch candidate" },
//             { status: 500 }
//         );
//     }

//     if (!candidate) {
//         return NextResponse.json(
//             { error: "A valid candidate ID is required" },
//             { status: 400 }
//         );
//     }

//     try {

//         //get the cycle


//         const totalsResponse = await axios.get(`${FEC_API_BASE_URL}/v1/candidate/${candidate_id}/totals/`, {
//             params: {
//                 cycle: 2024,
//                 api_key: process.env.NEXT_PUBLIC_OPEN_FEC_API_KEY,
//             },
//         }

//     } catch (error) {
//         console.error("Error fetching committees:", error);
//         return NextResponse.json(
//             { error: "Failed to fetch candidate committees" },
//             { status: 500 }
//         );
//     }
//     return NextResponse.json({ doners, status: 200 });
// }
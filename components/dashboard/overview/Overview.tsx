"use client"

import React from "react";
import { currentCandidateStore } from "@/state/State";
import { useStore } from "zustand";
import axios from "axios";
import { aiInfoStore } from "@/state/State";

function Overview() {
    const { basicInfo } = useStore(currentCandidateStore);
    const { prompt, output, setPrompt, setOutput } = useStore(aiInfoStore);

    if (!basicInfo) return <div>No candidate data loaded.</div>;

    const {
        name,
        party_full,
        office_full,
        state,
        active_through,
        candidate_inactive,
        candidate_status,
        first_file_date,
        last_file_date,
        has_raised_funds,
        election_years,
        principal_committees,
    } = basicInfo;

    const candidateStatusMap = {
        C: "Challenger",
        I: "Incumbent",
        O: "Open seat",
        N: "New candidate or undetermined",
    };

    async function aiAnalyze() {
        const prompt = 
        `give a quick overview of the candidate provided 
        in the context. This summary will include their political timeline and committees.
        Be as impartial and non biased as possible.`;

        const response = await fetch(`/api/agent?prompt=${prompt}`);
        const output = await response.json();

        setOutput(output.message);
    }

    return (
        <div className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold">{name}</h2>
            <button className="bg-blue-400 rounded-md py-2 text-white cursor-pointer hover:bg-orange-400" onClick={aiAnalyze}>
                AI Analyze
            </button>
            <p>
                <strong>Party:</strong> {party_full}
            </p>
            <p>
                <strong>Office:</strong> {office_full} ({state})
            </p>
            <p>
                <strong>Status:</strong>{" "}
                {candidateStatusMap[
                    candidate_status as keyof typeof candidateStatusMap
                ] || "Unknown"}
            </p>
            <p>
                <strong>Active Years:</strong> {election_years?.[0]} –{" "}
                {active_through}
            </p>
            <p>
                <strong>Currently Running:</strong>{" "}
                {candidate_inactive ? "No" : "Yes"}
            </p>
            <p>
                <strong>Has Raised Funds:</strong>{" "}
                {has_raised_funds ? "Yes" : "No"}
            </p>
            <p>
                <strong>First Filed:</strong> {first_file_date}
            </p>
            <p>
                <strong>Last Filed:</strong> {last_file_date}
            </p>

            {principal_committees && principal_committees.length > 0 && (
                <div>
                    <h3 className="text-xl font-semibold mt-4">
                        Top Committees
                    </h3>
                    <ul className="list-disc list-inside">
                        {principal_committees
                            .slice(0, 2)
                            .map((committee: any, i: number) => (
                                <li key={i}>
                                    <strong>{committee.name}</strong> –{" "}
                                    {committee.designation_full}, Treasurer:{" "}
                                    {committee.treasurer_name}
                                </li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Overview;

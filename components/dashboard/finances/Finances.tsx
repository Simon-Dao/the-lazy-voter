"use client";

import React, { useEffect, useState } from "react";
import { useStore } from "zustand";
import { currentCandidateStore, navigationStore } from "@/state/State";
import ElectionYearSelector from "../ElectionYearSelector";

function formatCurrency(value: number) {
    return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
    });
}

function Finances() {
    const { name, basicInfo } = useStore(currentCandidateStore);
    const { selectedElectionYear } = useStore(navigationStore);
    const [donors, setDonors] = useState<any[]>([]);
    const [totals, setTotals] = useState<any>(null);

    useEffect(() => {
        async function fetchDonors() {
            if (!basicInfo?.candidate_id || !selectedElectionYear) return;

            const response = await fetch(
                `/api/candidate/get-schedule-a/donors?two_year_transaction_period=${selectedElectionYear}&candidate_id=${basicInfo.candidate_id}`
            );
            const data = await response.json();
            setDonors(data.donors || []);
        }

        async function fetchTotals() {
            if (!basicInfo?.candidate_id || !selectedElectionYear) return;

            const response = await fetch(
                `/api/candidate/get-schedule-a/totals?cycle=${selectedElectionYear}&candidate_id=${basicInfo.candidate_id}`
            );
            const data = await response.json();
            setTotals(data.totals?.[0] || null);
        }

        fetchTotals();
        fetchDonors();
    }, [selectedElectionYear, basicInfo]);

    return (
        <div className="p-6">
            {name !== "" ? (
                <>
                    <h2 className="text-2xl font-semibold mb-4">{name} – {selectedElectionYear}</h2>
                    <ElectionYearSelector />

                    {totals && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
                            <div className="bg-white p-4 rounded shadow">
                                <p className="text-gray-500">Total Raised</p>
                                <p className="text-lg font-semibold">{formatCurrency(totals.contributions)}</p>
                            </div>
                            <div className="bg-white p-4 rounded shadow">
                                <p className="text-gray-500">Total Spent</p>
                                <p className="text-lg font-semibold">{formatCurrency(totals.disbursements * -1)}</p>
                            </div>
                            <div className="bg-white p-4 rounded shadow">
                                <p className="text-gray-500">PAC Contributions</p>
                                <p className="text-lg font-semibold">{formatCurrency(totals.other_political_committee_contributions)}</p>
                            </div>
                            <div className="bg-white p-4 rounded shadow">
                                <p className="text-gray-500">Individual Contributions &gt; $200</p>
                                <p className="text-lg font-semibold">{formatCurrency(totals.individual_itemized_contributions)}</p>
                            </div>
                            <div className="bg-white p-4 rounded shadow">
                                <p className="text-gray-500">Individual Contributions &lt; $200</p>
                                <p className="text-lg font-semibold">{formatCurrency(totals.individual_unitemized_contributions)}</p>
                            </div>
                        </div>
                    )}

                    <h3 className="text-xl font-semibold mt-8 mb-2">Top Donors</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded shadow">
                            <thead>
                                <tr className="bg-gray-100 text-left text-sm uppercase text-gray-600">
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Entity Type</th>
                                    <th className="px-4 py-2">Amount</th>
                                    <th className="px-4 py-2">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donors.map((donor, i) => (
                                    <tr key={i} className="border-t">
                                        <td className="px-4 py-2">{donor.contributor_name}</td>
                                        <td className="px-4 py-2">{donor.entity_type}</td>
                                        <td className="px-4 py-2">{formatCurrency(donor.contribution_receipt_amount)}</td>
                                        <td className="px-4 py-2">{donor.contribution_receipt_date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <div className="text-gray-500">No candidate data loaded.</div>
            )}
        </div>
    );
}

export default Finances;

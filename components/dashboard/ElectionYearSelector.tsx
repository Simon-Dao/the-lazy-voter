import React from "react";
import { useStore } from "zustand";
import { currentCandidateStore } from "@/state/State";
import { navigationStore } from "@/state/State";

function ElectionYearSelector() {
    const { basicInfo } = useStore(currentCandidateStore);
    const { selectedElectionYear, setSelectedElectionYear } =
        useStore(navigationStore);

    return (
        <div className="flex w-full bg-white p-4 shadow-md">
            <h2 className="text-lg font-semibold mb-2">Election Years</h2>
            <ul className="flex flex-wrap">

                {basicInfo.election_years.map((year: number, index: number) => (
                    <button
                        key={index}
                        onClick={() => setSelectedElectionYear(String(year))}
                        className={
                            (selectedElectionYear == String(year)
                                ? "bg-blue-400"
                                : "bg-gray-100") +
                            " text-gray-700 m-1 px-2 py-1 rounded-md cursor-pointer"
                        }
                    >
                        {year}
                    </button>
                ))}
            </ul>
        </div>
    );
}

export default ElectionYearSelector;

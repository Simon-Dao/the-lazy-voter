import React, { useState } from "react";
import { searchBarStore } from "@/state/State";
import { useStore } from "zustand";
import { currentCandidateStore } from "@/state/State";
import { navigationStore } from "@/state/State";
import SearchBar from "@/components/header/SearchBar";

function List() {
    const { results } = useStore(searchBarStore);
    const { setName, setState, setBasicInfo } = useStore(currentCandidateStore);
    const { selectedSearchResult, setSelectedSearchResult } = useStore(navigationStore);

    function handleClick(candidate: any) {
        setSelectedSearchResult(
            candidate.name + candidate.office_full + candidate.active_through
        );
        setName(candidate.name);
        setState(candidate.state);
        setBasicInfo(candidate);
    }

    function isSelected(candidate: any) {
        return (
            selectedSearchResult ===
            candidate.name + candidate.office_full + candidate.active_through
        );
    }

    return (
        <div className="container mx-auto py-10">

            <SearchBar />

            <ul className="">
                {results.map((candidate, index) => (
                    <div key={index} onClick={() => handleClick(candidate)}>
                        <div
                            className={
                                "relative overflow-hidden rounded-lg cursor-pointer flex flex-col mb-4 bg-gray-100 p-3"
                                + (isSelected(candidate)
                                    ? " bg-blue-100 border border-blue-500"
                                    : "")
                            }
                        >
                            <h1>{candidate.name} ({candidate.state})</h1>
                            <h2>Office: {candidate.office_full}</h2>
                            <h2>Active Through: {candidate.active_through}</h2>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default List;

"use client";

import { searchBarStore } from "@/state/State";
import { useStore } from "zustand";
import { useDebounce } from "@/app/lib/utils";
import { useEffect } from "react";

export default function SearchBar() {
    const { query, setQuery, setResults } = useStore(searchBarStore);
    const debouncedQuery = useDebounce(query, 300); // wait 300ms

    useEffect(() => {
        if (debouncedQuery) {
            handleSearch();
        }
    }, [debouncedQuery]);

    const handleSearch = async () => {

        const res = await fetch(
            `/api/candidate/search-candidate?name=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        setResults(data.candidates || []);
    };

    return (
        <div className="flex w-full max-w-md items-center rounded-2xl overflow-hidden bg-white">
            <input
                className="flex-1 px-4 py-2 text-sm bg-gray-100 outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Candidates..."
            />
            {/* <button
                className="cursor-pointer px-4 h-full bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium"
                onClick={handleSearch}
            >
                Search
            </button> */}
        </div>
    );
}

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Totals {
    receipts: number;
    candidate_contributions: number;
    individual_contributions: number;
    political_party_committee_contributions: number;
    other_political_committee_contributions: number;
}

interface NavigationState {
    selectedElectionYear: number | null;
    setSelectedElectionYear: (result: number | null) => void;
    selectedSearchResult: string | null;
    setSelectedSearchResult: (result: string | null) => void;
    currentSideNavTab: string;
    setCurrentSideNavTab: (tab: string) => void;
    currentSideOption: string;
    setCurrentSideOption: (option: string) => void;
    currentDashboardTab: string;
    setCurrentDashboardTab: (tab: string) => void;
}

interface QueryState {
    query: string;
    results: any[];
    total: Totals | null;
    setTotal: (newTotal: Totals) => void;
    setQuery: (newQuery: string) => void;
    setResults: (data: any[]) => void;
}

interface CurrentCandidateState {
    name: string;
    basicInfo: any;
    totals: Totals | null;
    setName: (newName: string) => void;
    setBasicInfo: (newBasicInfo: any) => void;
    setTotals: (newTotals: any) => void;
}

export const navigationStore = create<NavigationState>()(
    persist(
        (set) => ({
            selectedElectionYear: null,
            setSelectedElectionYear: (year: number | null) => set({ selectedElectionYear: year }),
            selectedSearchResult: null,
            setSelectedSearchResult: (result) =>
                set({ selectedSearchResult: result }),
            currentSideNavTab: "Search",
            setCurrentSideNavTab: (tab) => set({ currentSideNavTab: tab }),
            currentSideOption: "home",
            setCurrentSideOption: (option) =>
                set({ currentSideOption: option }),
            currentDashboardTab: "overview",
            setCurrentDashboardTab: (tab) => set({ currentDashboardTab: tab }),
        }),
        {
            name: "navigationStore", // sessionStorage key
            storage: {
                getItem: (key) => {
                    const item = sessionStorage.getItem(key);
                    return item ? JSON.parse(item) : null;
                },
                setItem: (key, value) =>
                    sessionStorage.setItem(key, JSON.stringify(value)),
                removeItem: (key) => sessionStorage.removeItem(key),
            },
        }
    )
);

export const currentCandidateStore = create<CurrentCandidateState>()(
    persist(
        (set) => ({
            name: "",
            basicInfo: null,
            totals: null,
            setName: (newName) => set({ name: newName }),
            setBasicInfo: (newBasicInfo) => set({ basicInfo: newBasicInfo }),
            setTotals: (newTotals) => set({ totals: newTotals }),
        }),
        {
            name: "currentCandidateStore", // sessionStorage key
            storage: {
                getItem: (key) => {
                    const item = sessionStorage.getItem(key);
                    return item ? JSON.parse(item) : null;
                },
                setItem: (key, value) =>
                    sessionStorage.setItem(key, JSON.stringify(value)),
                removeItem: (key) => sessionStorage.removeItem(key),
            },
        }
    )
);

export const searchBarStore = create<QueryState>()(
    persist(
        (set) => ({
            query: "",
            results: [],
            total: null,
            setTotal: (newTotal) => set({ total: newTotal }),
            setQuery: (newQuery) => set({ query: newQuery }),
            setResults: (data) => set({ results: data }),
        }),
        {
            name: "searchBarStore", // sessionStorage key
            storage: {
                getItem: (key) => {
                    const item = sessionStorage.getItem(key);
                    return item ? JSON.parse(item) : null;
                },
                setItem: (key, value) =>
                    sessionStorage.setItem(key, JSON.stringify(value)),
                removeItem: (key) => sessionStorage.removeItem(key),
            },
        }
    )
);

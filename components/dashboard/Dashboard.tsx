import React from "react";
import { useStore } from "zustand";
import { navigationStore } from "@/state/State";
import Overview from "@/components/dashboard/overview/Overview";
import Finances from "@/components/dashboard/finances/Finances";
import Policies from "@/components/dashboard/policies/Policies";
import { currentCandidateStore } from "@/state/State";

function Dashboard() {
    const { basicInfo } = useStore(currentCandidateStore);
    const { currentDashboardTab, setCurrentDashboardTab } =
        useStore(navigationStore);
    const tabs = ["Overview", "Campaign Finance", "Policies"];

    return (
        <div className="flex w-full h-full flex-col bg-gray-50">

            {/* Tabs */}
            <div className="h-12 w-full bg-gray-100 shadow-md">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`px-2 py-2 mx-1 rounded-br-md ${
                            currentDashboardTab === tab
                                ? "bg-gray-300"
                                : "bg-white"
                        }`}
                        onClick={() => setCurrentDashboardTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="flex-1  overflow-y-scroll p-4">
                {currentDashboardTab === "Overview" && <Overview />}
                {currentDashboardTab === "Campaign Finance" && <Finances />}
                {currentDashboardTab === "Policies" && <Policies />}
            </div>
        </div>
    );
}

export default Dashboard;

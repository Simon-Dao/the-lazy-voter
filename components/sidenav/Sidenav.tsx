"use client";

import React, { useEffect, useState } from "react";
import SearchBar from "@/components/header/SearchBar";
import List from "@/components/sidenav/search/List";
import { useStore } from "zustand";
import { navigationStore } from "@/state/State";
import AiAnalyzer from "./AiAnalyzer";

function Sidenav() {
    const { currentSideNavTab, setCurrentSideNavTab } = useStore(navigationStore);

    const tabs = ["Search", "AI Analyzer"];

    const handleTabClick = (tab: string) => {
        setCurrentSideNavTab(tab);
    };

    return (
        <div className="w-1/3 bg-white h-screen flex flex-col shadow-md">
            <div className="flex w-full h-20 items-end shadow-md">
                {tabs.map((tab) => (
                    <div
                        key={tab}
                        onClick={() => handleTabClick(tab)}
                        className={`px-3 cursor-pointer shadow-md ${
                            tab === currentSideNavTab ? "bg-green-400" : "bg-white"
                        }`}
                    >
                        {tab}
                    </div>
                ))}
            </div>
            <ul className="flex-1 bg-white shadow-md overflow-y-scroll p-3">
                {currentSideNavTab == "Search" && <List/>}
                {currentSideNavTab == "AI Analyzer" && <AiAnalyzer/>}
            </ul>
        </div>
    );
}

export default Sidenav;

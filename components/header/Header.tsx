"use client"

import React, {useState} from "react";
import SearchBar from "@/components/header/SearchBar";
import {useStore} from "zustand";
import { currentCandidateStore } from "@/state/State";

function Header() {
    
    //TODO placeholder state
    const [query, setQuery] = React.useState("");
    const { name } = useStore(currentCandidateStore);

    return (
        <header className="w-full bg-white h-12 flex items-center justify-between sticky top-0 z-40">
            {/* Left: Logo */}
            <div className="flex text-4xl items-center">
                🏛️
            </div>

            {/* Center: Navigation */}
            <nav className="hidden md:flex font-semibold text-sm">
                {name}
            </nav>

            {/* Right: Login */}
            <div className="text-sm font-medium hover:text-indigo-600 cursor-pointer flex items-center space-x-1 px-4">
                <span>Sources</span>
            </div>
        </header>
    );
}

export default Header;

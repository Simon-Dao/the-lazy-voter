"use client"
import React, { useState } from "react";
import { useStore } from "zustand";
import { aiInfoStore } from "@/state/State";

function AiAnalyzer() {
    
    const { prompt, output, setPrompt, setOutput } = useStore(aiInfoStore);

    async function onEnter() {

        const response = await fetch(`/api/agent?prompt=${prompt}`);
        const j = await response.json();
    }

    return (
        <div className="bg-orange-300 h-full w-full flex flex-col">
            <div className="flex-1">{output || "placeholder"}</div>
            <div className="w-full h-20 flex items-center justify-items-center">
                <input
                    type="text"
                    placeholder="enter a prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <button>Enter</button>
            </div>
        </div>
    );
}

export default AiAnalyzer;

"use client";
import React, { useState } from "react";
import { useStore } from "zustand";
import { aiInfoStore } from "@/state/State";

function AiAnalyzer() {
  const { prompt, output, setPrompt, setOutput } = useStore(aiInfoStore);
  const [loading, setLoading] = useState(false);

  async function onEnter() {
    
    if(!prompt) return;
    if (!prompt.trim()) return;

    setLoading(true);
    setOutput("Loading...");

    const response = await fetch(`/api/agent?prompt=${encodeURIComponent(prompt)}`);
    const j = await response.json();

    setOutput(j.message);
    setLoading(false);
    setPrompt("");
  }

  return (
    <div className="overflow-hidden h-full w-full bg-orange-100 flex flex-col font-sans text-gray-800">
      {/* Output Area */}
      <div className="flex-1 overflow-y-scroll p-6 text-base bg-white shadow-inner">
        <div className="whitespace-pre-wrap">{output || "Ask a question to begin."}</div>
      </div>

      {/* Input Bar */}
      <div className="h-20 bg-white border-t flex items-center gap-4 px-6">
        <input
          type="text"
          placeholder="Enter a prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-1 px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          onClick={onEnter}
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl shadow-md disabled:opacity-50 transition"
        >
          {loading ? "..." : "Enter"}
        </button>
      </div>
    </div>
  );
}

export default AiAnalyzer;

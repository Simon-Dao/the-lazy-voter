"use client";
import { JsonEditor } from "json-edit-react";

import { useStore } from "zustand";
import { searchBarStore } from "@/state/State";
import Dashboard from "../components/dashboard/Dashboard";

export default function Home() {

    return (
        <div className="flex flex-col w-full h-full">
            <Dashboard/>
        </div>
    );
}

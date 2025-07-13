import React from "react";
import { currentCandidateStore } from "@/state/State";
import { useStore } from "zustand";
import { JsonEditor } from "json-edit-react";

function Overview() {
    const { basicInfo } = useStore(currentCandidateStore);

    return (
        <div className="flex flex-col">
         
            <JsonEditor data={basicInfo} />
        </div>
    );
}

export default Overview;

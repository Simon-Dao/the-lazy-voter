import React from "react";
import { useStore } from "zustand";
import { currentCandidateStore } from "@/state/State";
import ElectionYearSelector from "../ElectionYearSelector";

function Policies() {
    const { basicInfo } = useStore(currentCandidateStore);

    return (
        <div>
          <ElectionYearSelector />
        </div>
    );
}

export default Policies;

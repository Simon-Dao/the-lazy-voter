import React from "react";
import { useStore } from "zustand";
import { currentCandidateStore } from "@/state/State";
import ElectionYearSelector from "../ElectionYearSelector";

function Policies() {
    const { name, basicInfo } = useStore(currentCandidateStore);

    return (
        <div>
          {name !== "" ? (
                <ElectionYearSelector />
            ) : (
                <div>
                    No candidate data loaded.
                </div>
            )
            }
        </div>
    );
}

export default Policies;

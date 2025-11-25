import React, { useEffect, useState } from "react";
import { useStore } from "zustand";
import { navigationStore } from "@/state/State";

function AggregateView({ bills }: { bills: any[] }) {
  const [billsData, setBillsData] = useState<
    Map<string, { count: number; bills: any[] }>
  >(new Map());

  const { selectedPolicyArea, setSelectedPolicyArea } = useStore(navigationStore);

  useEffect(() => {
    if (!bills || bills.length === 0) {
      setBillsData(new Map());
      return;
    }

    const aggregation = new Map();

    bills.forEach((bill) => {
      const policyArea = bill.policyArea?.name || "Unknown";

      if (!aggregation.has(policyArea)) {
        aggregation.set(policyArea, { count: 1, bills: [bill] });
      } else {
        const entry = aggregation.get(policyArea);
        entry.count++;
        // entry.bills.push(bill);
      }
    });

    setBillsData(aggregation);
  }, [bills]);

  return (
    <div className="flex flex-wrap gap-3">
      {Array.from(billsData.entries()).map(([policyArea, data]) => (
        <div
          onClick={() => setSelectedPolicyArea(policyArea == selectedPolicyArea ? "" : policyArea)}
          key={policyArea}
          className={(policyArea == selectedPolicyArea ? "bg-orange-400" : "bg-blue-400") + " cursor-pointer text-white rounded-md px-3 py-2 shadow-sm flex items-center gap-2 w-fit max-w-xs"}
        >
          <span className="text-sm font-medium truncate">{policyArea}</span>
          <span className="text-sm font-bold bg-white text-orange-600 px-2 py-0.5 rounded-full">
            {data.count}
          </span>
        </div>
      ))}
    </div>
  );
}

export default AggregateView;
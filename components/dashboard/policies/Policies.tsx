import React, { useEffect, useState } from "react";
import { useStore } from "zustand";
import { currentCandidateStore } from "@/state/State";
import { navigationStore } from "@/state/State";
import { STATE_MAP } from "@/state/Constants";
import AggregateView from "./AggregateView";

type Bill = {
  type?: string;
  number?: string | number;
  title?: string;
  introducedDate?: string;
  congress?: string | number;
  latestAction?: { text?: string } | null;
  url?: string;
  policyArea: { name: string }
};

function Policies() {
  const { name, basicInfo, setCongressId, congressId } = useStore(
    currentCandidateStore
  );
  const { selectedElectionYear,selectedPolicyArea } = useStore(navigationStore);
  const [bills, setBills] = useState<Bill[]>([]);
  const [filteredBills, setFilteredBills] = useState<Bill[]>([]);
  const [res, setRes] = useState<string>("");

  useEffect(() => {
    async function fetchCandidateId() {
      if (!basicInfo?.candidate_id || !selectedElectionYear) return;

      const response = await fetch(
        `/api/candidate/get-congress-id?state=${STATE_MAP.get(
          basicInfo.state
        )}&name=${basicInfo.name}`
      );
      const data = await response.json();
      setCongressId(data.data);
    }

    async function fetchCandidateBills(cid: string) {
      const response = await fetch(
        `/api/candidate/get-bills?congressId=${cid}&noLimit=true`
      );
      const data = await response.json();
      let originalBills = data.data.filter((f: { title: string; }) => f.title != undefined)

      setBills(originalBills || []);
      setFilteredBills(originalBills || []);
    }

    async function loadData() {
      await fetchCandidateId();
    
      // Only fetch bills AFTER congressId is set
      if (congressId) {
        await fetchCandidateBills(congressId);
      }
    }

    loadData();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mt-6">Sponsored Bills</h2>
      <AggregateView bills={bills}></AggregateView>
      {bills.length}
      {filteredBills.length > 0 ? (
        <ul className="space-y-3">
          {filteredBills
            .filter((bill) => selectedPolicyArea === "" || bill.policyArea?.name === selectedPolicyArea)
            .map((bill, idx) => (
              <li key={idx} className="border p-4 rounded shadow-sm">
                <div className="text-lg font-bold">
                  {bill.type}
                  {bill.number} — {bill.title}
                </div>

                <div className="text-sm text-gray-600">
                  Introduced: {bill.introducedDate}
                </div>

                <div className="text-sm text-gray-600">
                  Congress: {bill.congress}
                </div>

                <div className="text-sm mt-1">
                  <strong>Latest Action:</strong> {bill.latestAction?.text}
                </div>

                <a
                  href={
                    bill.url +
                    "&api_key=" +
                    process.env.NEXT_PUBLIC_CONGRESS_API_KEY
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm mt-2 inline-block"
                >
                  View Bill →
                </a>

              </li>
            ))}
        </ul>
      ) : (
        <div className="text-gray-500">No bills found.</div>
      )}
    </div>
  );
}

export default Policies;

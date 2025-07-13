import React from 'react'
import { searchBarStore } from '@/state/State'
import { useStore } from 'zustand'

function Grid() {

  const { results } = useStore(searchBarStore);

  console.log(results)

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
        {results.map((candidate, index) => (
          <div
            key={index}
            className="p-10 grid-element relative overflow-hidden rounded-lg shadow-lg cursor-pointer flex flex-col"
          >
            <h1>
              {candidate.name}
            </h1>
            <h2>Office: {candidate.office_full}</h2>
            <h2>Active Through: {candidate.active_through}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Grid
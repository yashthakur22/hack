import React, { useState } from 'react'
import { FaPills, FaSearch, FaHistory } from 'react-icons/fa'

type Medication = {
  drug: string
  dose_val_rx: string
  dose_unit_rx: string
  route: string
  starttime: string
  stoptime: string
}

type MedicationsProps = {
  medications: Medication[]
}

export default function Medications({ medications }: MedicationsProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showAllHistory, setShowAllHistory] = useState(false)

  // Sort medications by start time, most recent first
  const sortedMedications = [...medications].sort((a, b) => 
    new Date(b.starttime).getTime() - new Date(a.starttime).getTime()
  )

  const currentMedications = sortedMedications.filter(med => !med.stoptime || new Date(med.stoptime) > new Date())

  const displayMedications = showAllHistory ? sortedMedications : currentMedications.slice(0, 5)

  const filteredMedications = displayMedications.filter(medication => 
    medication.drug.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medication.route.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <FaPills className="mr-2" /> Medications
        </h3>
        <button
          onClick={() => setShowAllHistory(!showAllHistory)}
          className="p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          title={showAllHistory ? "Show Current" : "Show All History"}
        >
          <FaHistory className="w-4 h-4" />
        </button>
      </div>
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search medications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
      </div>
      <div className="space-y-3">
        {filteredMedications.map((medication, index) => (
          <div key={index} className="border-b pb-2">
            <div className="font-medium">{medication.drug}</div>
            <div className="text-sm text-gray-600">
              {medication.dose_val_rx} {medication.dose_unit_rx}, {medication.route}
            </div>
            <div className="text-xs text-gray-500">
              Start: {new Date(medication.starttime).toLocaleDateString()}
              {medication.stoptime && ` | Stop: ${new Date(medication.stoptime).toLocaleDateString()}`}
            </div>
          </div>
        ))}
      </div>
      {!showAllHistory && currentMedications.length > 5 && (
        <button 
          onClick={() => setShowAllHistory(true)}
          className="mt-4 text-blue-500 hover:text-blue-600 transition-colors"
        >
          Show {currentMedications.length - 5} more medications...
        </button>
      )}
    </div>
  )
}
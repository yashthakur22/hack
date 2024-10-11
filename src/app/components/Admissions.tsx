import React, { useState } from 'react'
import { FaHospital, FaHistory, FaChevronDown, FaChevronUp } from 'react-icons/fa'

type Admission = {
  admittime: string
  dischtime: string
  admission_type: string
  admission_location: string
  discharge_location: string
  insurance: string
}

type AdmissionsProps = {
  admissions: Admission[]
}

export default function Admissions({ admissions }: AdmissionsProps) {
  const [showAllHistory, setShowAllHistory] = useState(false)
  const [expandedAdmission, setExpandedAdmission] = useState<string | null>(null)

  // Sort admissions by admit time, most recent first
  const sortedAdmissions = [...admissions].sort((a, b) => 
    new Date(b.admittime).getTime() - new Date(a.admittime).getTime()
  )

  const displayAdmissions = showAllHistory ? sortedAdmissions : [sortedAdmissions[0]]

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <FaHospital className="mr-2" /> Admissions
        </h3>
        <button
          onClick={() => setShowAllHistory(!showAllHistory)}
          className="p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          title={showAllHistory ? "Show Recent" : "Show All History"}
        >
          <FaHistory className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-2">
        {displayAdmissions.map((admission, index) => (
          <div key={index} className="border rounded p-2">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpandedAdmission(expandedAdmission === admission.admittime ? null : admission.admittime)}>
              <span className="font-medium">Admission on {new Date(admission.admittime).toLocaleDateString()}</span>
              {expandedAdmission === admission.admittime ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {expandedAdmission === admission.admittime && (
              <div className="mt-2 text-sm">
                <p>Type: {admission.admission_type}</p>
                <p>Location: {admission.admission_location}</p>
                <p>Discharge: {new Date(admission.dischtime).toLocaleDateString()} to {admission.discharge_location}</p>
                <p>Insurance: {admission.insurance}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      {!showAllHistory && sortedAdmissions.length > 1 && (
        <button 
          onClick={() => setShowAllHistory(true)}
          className="mt-4 text-blue-500 hover:text-blue-600 transition-colors"
        >
          Show {sortedAdmissions.length - 1} more admissions...
        </button>
      )}
    </div>
  )
}
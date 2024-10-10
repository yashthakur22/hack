import React, { useState } from 'react'
import { LabResult } from '../models/types'
import { FaClipboardList, FaSearch } from 'react-icons/fa'

type LabResultsProps = {
  labResults: LabResult[]
}

export default function LabResults({ labResults }: LabResultsProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredResults = labResults.filter(result => 
    result.resultName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.resultValue.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
        <FaClipboardList className="mr-2" /> Lab Results
      </h3>
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search lab results..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredResults.map((result) => (
              <tr key={result.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(result.chartdate).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.resultName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.resultValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
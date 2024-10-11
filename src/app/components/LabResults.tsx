import React, { useState } from 'react'
import { FaClipboardList, FaSearch, FaHistory } from 'react-icons/fa'

type LabResult = {
  chartdate: string
  seq_num: string
  result_name: string
  result_value: string
}

type LabResultsProps = {
  labResults: LabResult[]
}

export default function LabResults({ labResults }: LabResultsProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showAllHistory, setShowAllHistory] = useState(false)

  // Sort lab results by date, most recent first
  const sortedResults = [...labResults].sort((a, b) => 
    new Date(b.chartdate).getTime() - new Date(a.chartdate).getTime()
  )

  // Get the most recent visit date
  const mostRecentDate = sortedResults[0]?.chartdate

  // Filter results for the most recent visit
  const mostRecentResults = sortedResults.filter(result => result.chartdate === mostRecentDate)

  const displayResults = showAllHistory ? sortedResults : mostRecentResults

  const filteredResults = displayResults.filter(result =>
    result.result_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.result_value.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <FaClipboardList className="mr-2" /> Lab Results
        </h3>
        <button
          onClick={() => setShowAllHistory(!showAllHistory)}
          className="p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          title={showAllHistory ? "Show Recent" : "Show All History"}
        >
          <FaHistory className="w-4 h-4" />
        </button>
      </div>
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
            {filteredResults.map((result, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(result.chartdate).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.result_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.result_value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!showAllHistory && sortedResults.length > mostRecentResults.length && (
        <button 
          onClick={() => setShowAllHistory(true)}
          className="mt-4 text-blue-500 hover:text-blue-600 transition-colors"
        >
          Show results from {sortedResults.length - mostRecentResults.length} more visits...
        </button>
      )}
    </div>
  )
}
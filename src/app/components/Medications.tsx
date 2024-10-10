import React, { useState } from 'react'
import { Medication } from '../models/types'
import { FaPills, FaSearch } from 'react-icons/fa'

type MedicationsProps = {
  medications: Medication[]
}

export default function Medications({ medications }: MedicationsProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredMedications = medications.filter(medication => 
    medication.drug.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medication.route.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
        <FaPills className="mr-2" /> Medications
      </h3>
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
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Drug</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dose</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredMedications.map((medication) => (
              <tr key={medication.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{medication.drug}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{medication.doseValRx} {medication.doseUnitRx}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{medication.route}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(medication.starttime).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
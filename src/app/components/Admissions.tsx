import React from 'react'
import { Admission } from '../models/types'
import { FaHospital } from 'react-icons/fa'

type AdmissionsProps = {
  admissions: Admission[]
}

export default function Admissions({ admissions }: AdmissionsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
        <FaHospital className="mr-2" /> Admissions
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admit Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discharge Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {admissions.map((admission) => (
              <tr key={admission.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(admission.admittime).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(admission.dischtime).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{admission.admissionType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admission.admissionLocation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
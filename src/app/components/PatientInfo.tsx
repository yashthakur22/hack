import React from 'react'
import { Patient } from '../models/types'
import { FaUser, FaCalendar, FaVenusMars } from 'react-icons/fa'

type PatientInfoProps = {
  patient: Patient
}

export default function PatientInfo({ patient }: PatientInfoProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
        <FaUser className="mr-2" /> Patient Information
      </h3>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="font-semibold flex items-center">
          <FaVenusMars className="mr-2" /> Gender:
        </div>
        <div>{patient.gender}</div>
        <div className="font-semibold flex items-center">
          <FaCalendar className="mr-2" /> Age:
        </div>
        <div>{patient.anchorAge} (as of {patient.anchorYear})</div>
        <div className="font-semibold">Year Group:</div>
        <div>{patient.anchorYearGroup}</div>
        {patient.dod && (
          <>
            <div className="font-semibold">Date of Death:</div>
            <div>{new Date(patient.dod).toLocaleDateString()}</div>
          </>
        )}
      </div>
    </div>
  )
}
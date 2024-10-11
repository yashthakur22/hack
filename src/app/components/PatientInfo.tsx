import React from 'react'
import { FaUser, FaCalendar, FaVenusMars } from 'react-icons/fa'

type PatientInfoProps = {
  patientInfo?: {
    subject_id: string
    gender: string
    anchor_age: string
    anchor_year: string
    anchor_year_group: string
    dod: string
  }
}

export default function PatientInfo({ patientInfo }: PatientInfoProps) {
  if (!patientInfo) {
    return <div>Loading patient information...</div>
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
        <FaUser className="mr-2" /> Patient Information
      </h3>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="font-semibold flex items-center">
          <FaVenusMars className="mr-2" /> Gender:
        </div>
        <div>{patientInfo.gender}</div>
        <div className="font-semibold flex items-center">
          <FaCalendar className="mr-2" /> Age:
        </div>
        <div>{patientInfo.anchor_age} (as of {patientInfo.anchor_year})</div>
        <div className="font-semibold">Year Group:</div>
        <div>{patientInfo.anchor_year_group}</div>
        {patientInfo.dod && (
          <>
            <div className="font-semibold">Date of Death:</div>
            <div>{patientInfo.dod}</div>
          </>
        )}
      </div>
    </div>
  )
}
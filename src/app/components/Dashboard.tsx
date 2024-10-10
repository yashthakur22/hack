'use client'

import React, { useState, useEffect } from 'react'
import { Patient } from '../models/types'
import PatientInfo from './PatientInfo'
import LabResults from './LabResults'
import Medications from './Medications'
import Admissions from './Admissions'
import AICopilot from './AICopilot'
import Citations from './Citations'
import { Panel as ResizablePanel, PanelGroup as ResizablePanelGroup } from 'react-resizable-panels'
import { FaChevronLeft, FaChevronRight, FaUser, FaClipboardList, FaPills, FaHospital } from 'react-icons/fa'

export default function Dashboard() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [citations, setCitations] = useState<string[]>([])
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false)
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false)

  useEffect(() => {
    fetchPatients()
  }, [])

  const fetchPatients = async () => {
    try {
      const response = await fetch('/api/patients')
      const data = await response.json()
      setPatients(data)
      if (data.length > 0) {
        setSelectedPatient(data[0])
      }
      setLoading(false)
    } catch (error) {
      setError('Error fetching patients')
      setLoading(false)
    }
  }

  const handleMessageSent = (message: string) => {
    const mockCitations = ['Source 1: Medical Journal A', 'Source 2: Health Database B']
    setCitations(mockCitations)
  }

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>
  if (error) return <div className="flex items-center justify-center h-screen text-red-500">Error: {error}</div>

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={25}
          minSize={15}
          maxSize={40}
          collapsible={true}
          onCollapse={() => setLeftPanelCollapsed(true)}
          onExpand={() => setLeftPanelCollapsed(false)}
        >
          <div className="h-full bg-white shadow-md p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Patient Info</h2>
              <button
                onClick={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
                className="p-2 rounded-full hover:bg-gray-200"
              >
                {leftPanelCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
              </button>
            </div>
            <select 
              onChange={(e) => setSelectedPatient(patients.find(p => p.id === e.target.value) || null)}
              className="w-full p-2 mb-4 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {patients.map(patient => (
                <option key={patient.id} value={patient.id}>
                  Patient {patient.id}
                </option>
              ))}
            </select>
            
            {selectedPatient && (
              <div className="space-y-4">
                <PatientInfo patient={selectedPatient} />
                <LabResults labResults={selectedPatient.labResults} />
                <Medications medications={selectedPatient.medications} />
                <Admissions admissions={selectedPatient.admissions} />
              </div>
            )}
          </div>
        </ResizablePanel>

        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full bg-white shadow-md p-4">
            <AICopilot patient={selectedPatient} onMessageSent={handleMessageSent} />
          </div>
        </ResizablePanel>

        <ResizablePanel
          defaultSize={25}
          minSize={15}
          maxSize={40}
          collapsible={true}
          onCollapse={() => setRightPanelCollapsed(true)}
          onExpand={() => setRightPanelCollapsed(false)}
        >
          <div className="h-full bg-white shadow-md p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Citations</h2>
              <button
                onClick={() => setRightPanelCollapsed(!rightPanelCollapsed)}
                className="p-2 rounded-full hover:bg-gray-200"
              >
                {rightPanelCollapsed ? <FaChevronLeft /> : <FaChevronRight />}
              </button>
            </div>
            <Citations citations={citations} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
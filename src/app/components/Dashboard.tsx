'use client'

import React, { useState, useEffect } from 'react'
import PatientInfo from './PatientInfo'
import LabResults from './LabResults'
import Medications from './Medications'
import Admissions from './Admissions'
import AICopilot from './AICopilot'
import Citations from './Citations'
import { Panel as ResizablePanel, PanelGroup as ResizablePanelGroup, PanelResizeHandle as ResizeHandle } from 'react-resizable-panels'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

type PatientData = {
  patientInfo: any[]
  labResults: any[]
  medications: any[]
  admissions: any[]
}

export default function Dashboard() {
  const [patientIds, setPatientIds] = useState<string[]>([])
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null)
  const [patientData, setPatientData] = useState<PatientData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [citations, setCitations] = useState<string[]>([])
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false)
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false)

  useEffect(() => {
    fetchPatientIds()
  }, [])

  useEffect(() => {
    if (selectedPatientId) {
      fetchPatientData(selectedPatientId)
    }
  }, [selectedPatientId])

  const fetchPatientIds = async () => {
    try {
      const response = await fetch('/api/patients')
      if (!response.ok) {
        throw new Error('Failed to fetch patient IDs')
      }
      const ids = await response.json()
      setPatientIds(ids)
      if (ids.length > 0) {
        setSelectedPatientId(ids[0])
      }
    } catch (error) {
      setError('Error fetching patient IDs')
    }
  }

  const fetchPatientData = async (id: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/patient/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch patient data')
      }
      const data = await response.json()
      setPatientData(data)
      setLoading(false)
    } catch (error) {
      setError('Error fetching patient data')
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
          onCollapse={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
          collapsedSize={0}
          className={leftPanelCollapsed ? 'min-w-[40px]' : ''}
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
            {!leftPanelCollapsed && (
              <>
                <select 
                  onChange={(e) => setSelectedPatientId(e.target.value)}
                  value={selectedPatientId || ''}
                  className="w-full p-2 mb-4 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {patientIds.map(id => (
                    <option key={id} value={id}>
                      Patient {id}
                    </option>
                  ))}
                </select>
                
                {patientData && (
                  <div className="space-y-4">
                    <PatientInfo patientInfo={patientData.patientInfo[0]} />
                    <LabResults labResults={patientData.labResults} />
                    <Medications medications={patientData.medications} />
                    <Admissions admissions={patientData.admissions} />
                  </div>
                )}
              </>
            )}
          </div>
        </ResizablePanel>

        <ResizeHandle className="w-2 bg-gray-200 hover:bg-gray-300 transition-colors duration-200" />

        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full bg-white shadow-md p-4">
            <AICopilot patient={patientData?.patientInfo[0]} onMessageSent={handleMessageSent} />
          </div>
        </ResizablePanel>

        <ResizeHandle className="w-2 bg-gray-200 hover:bg-gray-300 transition-colors duration-200" />

        <ResizablePanel
          defaultSize={25}
          minSize={15}
          maxSize={40}
          collapsible={true}
          onCollapse={() => setRightPanelCollapsed(!rightPanelCollapsed)}
          collapsedSize={0}
          className={rightPanelCollapsed ? 'min-w-[40px]' : ''}
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
            {!rightPanelCollapsed && <Citations citations={citations} />}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
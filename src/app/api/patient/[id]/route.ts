import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { parse } from 'csv-parse/sync'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    const patientData = {
      patientInfo: await readCSV(id, 'patientInfo.csv'),
      labResults: await readCSV(id, 'labresults.csv'),
      medications: await readCSV(id, 'medication.csv'),
      admissions: await readCSV(id, 'admissions.csv'),
    }

    if (patientData.patientInfo.length === 0) {
      return NextResponse.json({ message: 'Patient not found' }, { status: 404 })
    } else {
      return NextResponse.json(patientData)
    }
  } catch (error) {
    console.error('Error fetching patient data:', error)
    return NextResponse.json({ message: 'Error fetching patient data' }, { status: 500 })
  }
}

async function readCSV(patientId: string, fileName: string): Promise<any[]> {
  const filePath = path.join(process.cwd(), 'public', 'patient_data', patientId, fileName)
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const records = parse(fileContent, { columns: true, skip_empty_lines: true })
    return records
  } catch (error) {
    console.error(`Error reading file ${fileName} for patient ${patientId}:`, error)
    return []
  }
}
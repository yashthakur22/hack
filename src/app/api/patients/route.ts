import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    const patientDataPath = path.join(process.cwd(), 'public', 'patient_data')
    const folders = await fs.readdir(patientDataPath, { withFileTypes: true })
    const patientIds = folders
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)

    return NextResponse.json(patientIds)
  } catch (error) {
    console.error('Error fetching patient IDs:', error)
    return NextResponse.json({ message: 'Error fetching patient IDs' }, { status: 500 })
  }
}
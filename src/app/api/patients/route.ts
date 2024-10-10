import { NextResponse } from 'next/server'
import prisma from '@/app/lib/db'

export async function GET() {
  try {
    const patients = await prisma.patient.findMany({
      include: {
        admissions: true,
        labResults: true,
        medications: true,
      },
    })
    return NextResponse.json(patients)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching patients' }, { status: 500 })
  }
}
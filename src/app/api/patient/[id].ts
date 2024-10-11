import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import csv from 'csv-parser'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method === 'GET') {
    try {
      const patientData = {
        patientInfo: await readCSV('patientInfo.csv', id as string),
        labResults: await readCSV('labresults.csv', id as string),
        medications: await readCSV('medication.csv', id as string),
        admissions: await readCSV('admissions.csv', id as string),
      }

      res.status(200).json(patientData)
    } catch (error) {
      res.status(404).json({ message: 'Patient not found' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

async function readCSV(fileName: string, patientId: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const results: any[] = []
    fs.createReadStream(path.join(process.cwd(), 'public', 'patient_data', fileName))
      .pipe(csv())
      .on('data', (data) => {
        if (data.subject_id === patientId) {
          results.push(data)
        }
      })
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error))
  })
}
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create a sample patient
  const patient = await prisma.patient.create({
    data: {
      id: '10000032',
      gender: 'F',
      anchorAge: 52,
      anchorYear: 2180,
      anchorYearGroup: '2014 - 2016',
      dod: new Date('2180-09-09'),
      admissions: {
        create: [
          {
            admittime: new Date('2180-05-06T22:23:00'),
            dischtime: new Date('2180-05-07T17:15:00'),
            admissionType: 'URGENT',
            admitProviderId: 'P49AFC',
            admissionLocation: 'TRANSFER FROM HOSPITAL',
            dischargeLocation: 'HOME',
            insurance: 'Medicaid',
            language: 'English',
            maritalStatus: 'WIDOWED',
            race: 'WHITE',
            edregtime: new Date('2180-05-06T19:17:00'),
            edouttime: new Date('2180-05-06T23:30:00'),
            hospitalExpireFlag: 0
          }
        ]
      },
      labResults: {
        create: [
          {
            chartdate: new Date('2180-04-27'),
            seqNum: 1,
            resultName: 'Blood Pressure',
            resultValue: '110/65'
          },
          {
            chartdate: new Date('2180-04-27'),
            seqNum: 2,
            resultName: 'Weight (Lbs)',
            resultValue: '94'
          }
        ]
      },
      medications: {
        create: [
          {
            hadmId: '22595853',
            pharmacyId: '12775705',
            starttime: new Date('2180-05-08T08:00:00'),
            stoptime: new Date('2180-05-07T22:00:00'),
            drugType: 'MAIN',
            drug: 'Furosemide',
            prodStrength: '40mg Tablet',
            doseValRx: '40',
            doseUnitRx: 'mg',
            formValDisp: '1',
            formUnitDisp: 'TAB',
            route: 'PO/NG'
          }
        ]
      }
    }
  })

  console.log({ patient })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
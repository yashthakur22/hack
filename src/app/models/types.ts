export type Patient = {
    id: string
    gender: string
    anchorAge: number
    anchorYear: number
    anchorYearGroup: string
    dod: string | null
    admissions: Admission[]
    labResults: LabResult[]
    medications: Medication[]
  }
  
  export type Admission = {
    id: string
    admittime: string
    dischtime: string
    deathtime: string | null
    admissionType: string
    admitProviderId: string
    admissionLocation: string
    dischargeLocation: string
    insurance: string
    language: string
    maritalStatus: string
    race: string
    edregtime: string | null
    edouttime: string | null
    hospitalExpireFlag: number
  }
  
  export type LabResult = {
    id: string
    chartdate: string
    seqNum: number
    resultName: string
    resultValue: string
  }
  
  export type Medication = {
    id: string
    hadmId: string
    pharmacyId: string
    starttime: string
    stoptime: string
    drugType: string
    drug: string
    prodStrength: string
    doseValRx: string
    doseUnitRx: string
    formValDisp: string
    formUnitDisp: string
    route: string
  }
  
  export type Message = {
    id: string
    role: 'user' | 'ai'
    content: string
    createdAt: string
  }
export interface ICreateMedicalRecordForm {
  title: string
  description: string
  diagnosis: string
  treatment: string
  vetId: string
  clinicName: string
  notes: string
  attachments?: object[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any // For allowing other string key properties
}

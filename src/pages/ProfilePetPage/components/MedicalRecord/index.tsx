import { FC, ReactElement } from 'react'

import { IconMedicalReport } from '../../../../assets/icons'
import { BaseAccordeon } from '../../../../components/BaseAccordeon'
import { IMedicalRecord } from '../../../../constants/types'

interface Props {
  medicalRecord: IMedicalRecord[]
}

const SUBTITLES: Record<string, string> = {
  description: 'Description',
  diagnosis: 'Diagnosis',
  treatment: 'Treatment',
  clinicName: 'Clinic Name',
  attachments: 'Attachments',
  medications: 'Medications',
}

const isIgnoredKey = (key: string): boolean =>
  ['title', 'createdAt', 'date', 'id'].includes(key)

const isNotEmptyAttachmentOrMedication = (
  key: string,
  value: string | [],
): boolean =>
  !(key === 'attachments' || key === 'medications') || value.length > 0

const generateRecordChildren = (record: IMedicalRecord): ReactElement => {
  return (
    <div className="mt-2 flex gap-1 flex-col">
      {Object.entries(record).map(([key, value]) => {
        if (isIgnoredKey(key) || !isNotEmptyAttachmentOrMedication(key, value))
          return null

        return (
          <div
            key={key}
            className="w-full px-4 py-4 md:grid justify-between items-center rounded hover:bg-primary-100"
          >
            <h4 className="w-full text-base  font-bold leading-6 text-primary-950">
              {SUBTITLES[key]}
            </h4>
            <p className="text-base text-gray-600">{value}</p>
          </div>
        )
      })}
    </div>
  )
}

export const MedicalRecord: FC<Props> = ({ medicalRecord }) => {
  return (
    <>
      {medicalRecord.map((record, index) => (
        <div key={index}>
          <BaseAccordeon
            icon={<IconMedicalReport />}
            children={generateRecordChildren(record)}
            title={`${record.title} - Created at ${record.createdAt}`}
          />
        </div>
      ))}
    </>
  )
}

import { FC } from 'react'
import { BaseAccordeon } from '../../../../components/BaseAccordeon'
import { IconMedicalReport } from '../../../../assets/icons'

interface Irecord {
  medicalRecord: {
    id: string
    name: string
    description: string
    diagnosis: string
    treatment: string
    medications: string[]
    followUpRequired: boolean
    followUpDate: string
    vetId: string
    clinicName: string
    notes: string
    attachments: string[]
    createdAt: string
    updatedAt: string
  }
}

interface RecordProps {
  record: Irecord[]
}
export const MedicalRecord: FC<RecordProps> = ({ record }) => {
  const capitalize = /(^\w{1})|(\s+\w{1})/g
  return (
    <div className="mt-8">
      <h4 className="py-3.5 text-left md:pl-6 md:pr-3 text-sm font-semibold text-gray-900 sm:pl-7">
        Medical Reports
      </h4>
      {record &&
        record.map((petRecord, index) => {
          return (
            <div key={index}>
              <BaseAccordeon
                icon={<IconMedicalReport />}
                title={petRecord?.medicalRecord?.id.toLocaleUpperCase()}
                children={
                  <>
                    {Object.entries(petRecord?.medicalRecord).map(
                      ([key, value]) => (
                        <div
                          className="w-full p-2 md:grid justify-between items-center rounded ring ring-primary-100 hover:bg-primary-100 "
                          key={key}
                        >
                          <h4 className="w-full h-10 text-md md:text-lg font-bold leading-6 text-primary-950 ">
                            {key.replace(capitalize, (letter) =>
                              letter.toUpperCase(),
                            )}
                            :
                          </h4>
                          <p className="text-sm lg:text-lg text-gray-600">
                            {value}
                          </p>
                        </div>
                      ),
                    )}
                  </>
                }
              />
            </div>
          )
        })}
    </div>
  )
}

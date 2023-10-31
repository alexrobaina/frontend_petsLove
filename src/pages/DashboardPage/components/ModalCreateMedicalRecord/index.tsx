import { ChangeEvent } from 'react'
import { MultiValue } from 'react-select'

import { BaseInput } from '../../../../components/BaseInput'
import { BaseSelect } from '../../../../components/BaseSelect'
import { BaseTextArea } from '../../../../components/BaseTextArea'
import { ICreateMedicalRecordForm } from '../../constants'

interface Props {
  values: ICreateMedicalRecordForm
  handleChange: (e: ChangeEvent<Element>) => void
  setFieldValue: (
    field: string,
    value: string | number | File | null | MultiValue<unknown>,
  ) => void
}

const ModalCreateMedicalRecords: React.FC<Props> = ({
  values,
  handleChange,
  setFieldValue,
}) => {
  return (
    <div className="flex gap-4 flex-col  mt-10">
      <BaseSelect
        name="vet"
        isCreatable
        label="Veterinary"
        value={values?.vet}
        placeholder="Add Veterinary"
        setFieldValue={setFieldValue}
      />
      <BaseInput
        name="title"
        label="Title"
        value={values?.title}
        placeholder="Diagnosis"
        handleChange={handleChange}
      />
      <BaseSelect
        isCreatable
        name="medication"
        label="Add Medication"
        value={values?.medication}
        placeholder="Add Medication"
        setFieldValue={setFieldValue}
      />
      <BaseTextArea
        height={100}
        name="notes"
        label="Notes"
        value={values?.notes}
        placeholder="Add notes"
        handleChange={handleChange}
      />
      <BaseTextArea
        height={100}
        name="treatment"
        label="Treatment"
        value={values?.treatment}
        placeholder="Treatment"
        handleChange={handleChange}
      />
      <div>
        <div className="flex w-ful">
          <label
            htmlFor="file"
            className="w-full h-[60px] bg-primary-100 flex items-center justify-center rounded px-2 py-1 text-sm font-semibold text-primary-950 shadow-sm ring-1 ring-inset ring-primary-300 hover:bg-primary-300"
          >
            Select a file
          </label>
          <input
            // onChange={handleImageChange}
            type="file"
            id="file"
            name="images"
            className="hidden"
          />
        </div>
        <p className="mt-2 text-xs leading-5 text-gray-400">
          JPG, GIF or PNG. 1.5MB max.
        </p>
      </div>
    </div>
  )
}

export default ModalCreateMedicalRecords

import { FC, useState } from 'react'

import { BaseSelect } from '../../../../components/BaseSelect'

interface Option {
  value: string
  label: string
}

export const Selects: FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('chocolate')

  const options: Option[] = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ]

  return (
    <div className="mt-10">
      <BaseSelect
        name="select"
        options={options}
        value={selectedOption}
        setFieldValue={setSelectedOption}
      />
    </div>
  )
}

import { FC, useState } from 'react'

import { BaseSelect } from '../../../../components/BaseSelect'

interface Option {
  value: string
  label: string
}

export const Selects: FC = () => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)

  const options: Option[] = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ]

  return (
    <div className="mt-10">
      <BaseSelect
        options={options}
        value={selectedOption}
        onChange={setSelectedOption}
      />
    </div>
  )
}

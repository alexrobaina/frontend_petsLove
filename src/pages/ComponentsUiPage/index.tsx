import { FC, useState } from 'react'

import { BaseButtonGroups } from '../../components/BaseButtonGroups'
import { Header } from '../../components/Header'

import { Buttons } from './components/Buttons'
import { Loadings } from './components/Loadings'

export const ComponentsUiPage: FC = () => {
  const [viewComponents, setViewComponents] = useState('buttons')
  const buttonGroupList = [
    { name: 'Buttons', path: 'buttons' },
    { name: 'Loadings', path: 'loadings' },
    { name: 'Badgets', path: 'badgets' },
    { name: 'Inputs', path: 'inputs' },
  ]

  return (
    <>
      <div className="flex justify-between">
        <Header title="Components UI" />
        <BaseButtonGroups
          group={buttonGroupList}
          buttonSelected={viewComponents}
          handleSelectButtonGroup={setViewComponents}
        />
      </div>
      {viewComponents === 'buttons' && <Buttons />}
      {viewComponents === 'loadings' && <Loadings />}
    </>
  )
}

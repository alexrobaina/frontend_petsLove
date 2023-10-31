import { FC, useState } from 'react'

import { BaseButtonGroups } from '../../components/BaseButtonGroups'
import { Header } from '../../components/Header'

import { Buttons } from './components/Buttons'
import { Loadings } from './components/Loadings'
import { Selects } from './components/Selects'

export const ComponentsUiPage: FC = () => {
  const [viewComponents, setViewComponents] = useState('buttons')
  const buttonGroupList = [
    { name: 'Buttons', path: 'buttons' },
    { name: 'Loadings', path: 'loadings' },
    { name: 'Badgets', path: 'badgets' },
    { name: 'Inputs', path: 'inputs' },
    { name: 'Modals', path: 'modals' },
    { name: 'Selects', path: 'selects' },
  ]

  return (
    <>
      <div className="flex md:flex-row md:justify-between flex-col gap-5">
        <Header title="Components UI" />
        <BaseButtonGroups
          group={buttonGroupList}
          buttonSelected={viewComponents}
          handleSelectButtonGroup={setViewComponents}
        />
      </div>
      {viewComponents === 'buttons' && <Buttons />}
      {viewComponents === 'loadings' && <Loadings />}
      {viewComponents === 'selects' && <Selects />}
    </>
  )
}

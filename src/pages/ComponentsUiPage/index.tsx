import { FC, useState } from 'react'

import { IconLocation } from '../../assets/icons'
import { BaseButtonGroups } from '../../components/common/BaseButtonGroups'
import { Header } from '../../components/common/Header'
import { LinkedIconText } from '../../components/common/LinkedIconText'

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
    { name: 'LinkedIconText', path: 'linkedIconText' },
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
      {viewComponents === 'linkedIconText' && (
        <LinkedIconText
          icon={<IconLocation />}
          url="https://www.google.com/search?q=mendoza+godoy+cruz+av+san+martin+2023"
          text="Mendoza, Godoy Cruz, Av San Martin 3203"
        />
      )}
    </>
  )
}

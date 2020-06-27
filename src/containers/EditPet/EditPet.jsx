import React from 'react'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import CreatePet from 'containers/CreatePet'

const EditPet = () => {
  const { t } = useTranslation('editPet')

  return <CreatePet isEdition title={t('editTo')} />
}

export default observer(EditPet)

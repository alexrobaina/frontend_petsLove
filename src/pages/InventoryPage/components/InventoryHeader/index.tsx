import { useTranslation } from 'react-i18next'

import { Header } from '../../../../components/common/Header'

interface Props {}

export const InventoryHeader: React.FC<Props> = () => {
  const { t } = useTranslation(['inventory', 'common'])

  return (
    <header className="flex lg:flex-col xl:flex-col md:justify-between flex-col gap-5 mb-6">
      <div className="flex lg:flex-row xl:flex-row md:justify-between flex-col gap-5">
        <Header title={t('common:inventory')} />
      </div>
    </header>
  )
}

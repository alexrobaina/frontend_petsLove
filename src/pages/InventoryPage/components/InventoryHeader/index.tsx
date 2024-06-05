import { useTranslation } from 'react-i18next'

import { BaseButton } from '../../../../components/common/BaseButton'
import { BaseButtonGroups } from '../../../../components/common/BaseButtonGroups'
import { Header } from '../../../../components/common/Header'
import {
  IS_ADOPTED_OPTIONS,
  PET_CATEGORY_OPTIONS,
  PET_GENDER_OPTIONS,
} from '../../../constants/constants'

interface Props {}

export const InventoryHeader: React.FC<Props> = () => {
  const { t } = useTranslation(['inventory', 'common'])

  return (
    <header className="flex lg:flex-col xl:flex-col md:justify-between flex-col gap-5">
      <div className="flex lg:flex-row xl:flex-row md:justify-between flex-col gap-5">
        <Header title={t('common:inventory')} />
        <div className="flex flex-col gap-5 mt-10">
          {/* {petAnalytics && (
        <div className="flex justify-start items-center gap-5">
          <div className="flex flex-col gap-1 w-[60x] justify-center items-center bg-primary-100 rounded-md p-4">
            <span className="text-sm text-primary-800">
              {t('common:totalPets')}
            </span>
            <span className="text-lg font-bold text-gray-800">
              {petAnalytics.totalPets}
            </span>
          </div>
          <div className="flex flex-col gap-1 w-[60x] justify-center items-center bg-primary-100 rounded-md p-4">
            <span className="text-sm text-primary-800">
              {t('common:adoptedPets')}
            </span>
            <span className="text-lg font-bold text-gray-800">
              {petAnalytics.adoptedPets}
            </span>
          </div>
          <div className="flex flex-col gap-1 w-[60x] justify-center items-center bg-primary-100 rounded-md p-4">
            <span className="text-sm text-primary-800">
              {t('common:petsInAdoption')}
            </span>
            <span className="text-lg font-bold text-gray-800">
              {petAnalytics.petsInAdoption}
            </span>
          </div>
        </div>
      )  
    }  */}
        </div>
      </div>
    </header>
  )
}

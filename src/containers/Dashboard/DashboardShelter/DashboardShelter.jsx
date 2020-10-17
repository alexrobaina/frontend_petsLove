import React, { useCallback, useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { observer, useLocalStore } from 'mobx-react'
import { FaHandHoldingHeart } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import { AiFillFileAdd } from 'react-icons/ai'
import UserContext from 'Context/UserContext'
import ShelterStore from 'stores/ShelterStore'
import { LIMIT_LIST } from 'services/config'
import DashboardCard from 'components/commons/DashboardCard'
import { CREATE_PET, SEARCH_VOLANTEERS } from 'routing/routes'
import Title from 'components/commons/Title'
import ListPets from 'containers/ListPets'
import LayoutContainer from 'components/commons/LayoutContainer'
import styles from './dashboardShelter.scss'

const DashboardShelter = () => {
  const [page, setPage] = useState(1)
  const [limit] = useState(LIMIT_LIST)
  const [isSelectedForAdoption, setIsSelectedForAdoption] = useState(true)
  const [isSelectedAdopted, setIsSelectedAdopted] = useState(false)
  const history = useHistory()
  const rootStore = useContext(UserContext)
  const { authStore } = rootStore
  const shelterStore = useLocalStore(() => new ShelterStore(authStore.user._id))
  const { t } = useTranslation('dashboard')

  const { _id } = authStore.user

  const handleForAdoption = useCallback(() => {
    setPage(1)
    setIsSelectedForAdoption(true)
    setIsSelectedAdopted(false)
    shelterStore.setSwithPets(true)
    shelterStore.getPetsForAdoption(_id, LIMIT_LIST, 1, '', false)
  })

  const handleAdopted = useCallback(() => {
    setPage(1)
    setIsSelectedForAdoption(false)
    setIsSelectedAdopted(true)
    shelterStore.setSwithPets(false)
    shelterStore.getPetsAdopted(_id, LIMIT_LIST, 1, '', true)
  })

  const handleChangePage = useCallback((e, newPage) => {
    if (shelterStore.swithPets) {
      setPage(newPage)
      return shelterStore.getPetsForAdoption(_id, LIMIT_LIST, newPage, '', false)
    }
    setPage(newPage)
    shelterStore.getPetsAdopted(_id, LIMIT_LIST, newPage, '', true)
  }, [])

  const handleSearch = useCallback(e => {
    if (shelterStore.swithPets) {
      shelterStore.getPetsAdopted(_id, LIMIT_LIST, page, e.target.value, true)
    } else {
      shelterStore.getPetsForAdoption(_id, LIMIT_LIST, page, e.target.value, false)
    }
  }, [])

  const handleCreatePet = useCallback(() => {
    history.push(CREATE_PET)
  }, [])

  const handleSearchVolanteers = useCallback(() => {
    history.push(SEARCH_VOLANTEERS)
  }, [])

  const handleDeletePet = useCallback(id => {
    shelterStore.removePet(id)
  }, [])

  useEffect(() => {
    shelterStore.setSwithPets(true)
  }, [])

  const { petsList, totalPets, swithPets, isLoading } = shelterStore
  const { totalPetsForAdoption, totalPetsAdopted } = shelterStore.dashboardStore.dashboard

  return (
    <LayoutContainer>
      <Title mBottom="30px" title={t('dashboard')} />
      <div className={styles.container}>
        <DashboardCard
          titleCard={t('petsAdopt')}
          handleClick={handleForAdoption}
          isSelected={isSelectedForAdoption}
          total={totalPetsForAdoption.value}
        />
        <DashboardCard
          handleClick={handleAdopted}
          titleCard={t('petsAdopted')}
          total={totalPetsAdopted.value}
          isSelected={isSelectedAdopted}
        />
        <DashboardCard
          titleCard={t('addPet')}
          handleClick={handleCreatePet}
          icon={<AiFillFileAdd size={25} />}
        />
        <DashboardCard
          titleCard={t('searchVolanteers')}
          handleClick={handleSearchVolanteers}
          icon={<FaHandHoldingHeart size={22} />}
        />
      </div>
      <ListPets
        page={page}
        limit={limit}
        listPets={petsList}
        isLoading={isLoading}
        totalPets={totalPets}
        handleSearch={handleSearch}
        handleDelete={handleDeletePet}
        handleChangePage={handleChangePage}
        title={swithPets ? t('common:needHome') : t('adopted')}
      />
    </LayoutContainer>
  )
}

export default observer(DashboardShelter)

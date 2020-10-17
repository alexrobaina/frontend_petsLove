import React, { useState, useCallback, useContext } from 'react'
import { useHistory } from 'react-router'
import { observer, useLocalStore } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { LIMIT_LIST } from 'services/config'
import { FaPeopleCarry } from 'react-icons/fa'
import { AiFillFileAdd } from 'react-icons/ai'
import DashboardCard from 'components/commons/DashboardCard'
import { SEARCH_PROTECTIONIST, SEARCH_VOLANTEERS } from 'routing/routes'
import Title from 'components/commons/Title/Title'
import VolunteersStore from 'stores/VolunteersStore'
import UserContext from 'Context/UserContext'
import LayoutContainer from 'components/commons/LayoutContainer'
import ListPets from 'containers/ListPets'
import styles from './dashboardVoluntary.scss'

const DashboardVoluntary = () => {
  const [page, setPage] = useState(1)
  const [limit] = useState(LIMIT_LIST)
  const { t } = useTranslation('dashboard')
  const history = useHistory()
  const [isSelectedMyPets, setIsSelectedMyPets] = useState(false)
  const [isSelectedPetsCare, setIsSelectedPetsCare] = useState(true)
  const rootStore = useContext(UserContext)
  const { authStore } = rootStore
  const volunteersStore = useLocalStore(() => new VolunteersStore(authStore.user._id))

  const { _id } = authStore.user

  const handlePetsCare = useCallback(() => {
    volunteersStore.setSwithPets(false)
    setIsSelectedMyPets(false)
    setIsSelectedPetsCare(true)
    volunteersStore.loadPetsAssignedVolunteer(_id, LIMIT_LIST, 1, '', false)
  })

  const handleMyPets = useCallback(() => {
    volunteersStore.setSwithPets(true)
    setIsSelectedMyPets(true)
    setIsSelectedPetsCare(false)
    volunteersStore.loadPetsVolunteersOwner(_id, LIMIT_LIST, 1, '', false)
  })

  const handleChangePage = useCallback((e, newPage) => {
    if (volunteersStore.swithPets) {
      volunteersStore.getPetsForAdoption(_id, LIMIT_LIST, newPage, '', false)
      setPage(newPage)
    } else {
      volunteersStore.getPetsAdopted(_id, LIMIT_LIST, newPage, '', true)
      setPage(newPage)
    }
  }, [])

  const handleSearch = useCallback(e => {
    if (volunteersStore.swithPets) {
      volunteersStore.getPetsAdopted(_id, LIMIT_LIST, page, e.target.value, true)
    } else {
      volunteersStore.getPetsForAdoption(_id, LIMIT_LIST, page, e.target.value, false)
    }
  }, [])

  const handleSearchVolanteers = useCallback(() => {
    history.push(SEARCH_VOLANTEERS)
  }, [])

  const handleSearchShelters = useCallback(() => {
    history.push(SEARCH_PROTECTIONIST)
  }, [])

  const handleDeletePet = useCallback(idPet => {
    volunteersStore.removePet(idPet)
  }, [])

  const { petsList, totalPets, swithPets } = volunteersStore
  const {
    totalVolunteersPetsOwner,
    totalVolunteersPetsCare,
  } = volunteersStore.dashboardStore.dashboard

  return (
    <LayoutContainer>
      <Title mBottom="30px" title={t('dashboard')} />
      <div className={styles.container}>
        <DashboardCard
          handleClick={handlePetsCare}
          isSelected={isSelectedPetsCare}
          titleCard={t('common:petsCare')}
          total={totalVolunteersPetsCare.value}
        />
        <DashboardCard
          handleClick={handleMyPets}
          isSelected={isSelectedMyPets}
          titleCard={t('common:myPets')}
          total={totalVolunteersPetsOwner.value}
        />
        <DashboardCard
          handleClick={handleSearchVolanteers}
          icon={<AiFillFileAdd size={25} />}
          titleCard={t('searchVolanteers')}
        />
        <DashboardCard
          handleClick={handleSearchShelters}
          icon={<FaPeopleCarry size={22} />}
          titleCard={t('searchShelters')}
        />
      </div>
      <ListPets
        page={page}
        limit={limit}
        listPets={petsList}
        totalPets={totalPets}
        handleSearch={handleSearch}
        handleDelete={handleDeletePet}
        handleChangePage={handleChangePage}
        title={swithPets ? t('common:myPets') : t('common:needHome')}
      />
    </LayoutContainer>
  )
}

export default observer(DashboardVoluntary)

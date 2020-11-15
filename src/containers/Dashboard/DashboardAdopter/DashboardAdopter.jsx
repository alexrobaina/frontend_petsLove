import React, { useContext, useCallback, useState } from 'react'
import { AiFillFileAdd } from 'react-icons/ai'
import { FaPeopleCarry } from 'react-icons/fa'
import { useHistory } from 'react-router'
import { MdSearch } from 'react-icons/md'
import { useTranslation } from 'react-i18next'
import DashboardCard from 'components/commons/DashboardCard'
import { observer, useLocalStore } from 'mobx-react'
import LayoutContainer from 'components/commons/LayoutContainer'
import { CREATE_PET, SEARCH_PROTECTIONIST } from 'routing/routes'
import { LIMIT_LIST } from 'services/config'
import AdopterStore from 'stores/AdopterStore'
import Title from 'components/commons/Title/Title'
import ListPets from 'containers/ListPets'
import SEO from 'components/SEO'
import UserContext from 'Context/UserContext'
import styles from './dashboardAdopter.scss'

const DashboardAdopter = () => {
  const rootStore = useContext(UserContext)
  const history = useHistory()
  const [page, setPage] = useState(1)
  const [limit] = useState(LIMIT_LIST)
  const { authStore } = rootStore
  const { _id } = authStore.user
  const { t } = useTranslation('dashboard')
  const adopterStore = useLocalStore(() => new AdopterStore(_id))

  const handleChangePage = useCallback((e, newPage) => {
    adopterStore.loadPetsAdopter(_id, LIMIT_LIST, newPage)
    setPage(newPage)
  }, [])

  const handleCreatePet = useCallback(() => {
    history.push(CREATE_PET)
  }, [])

  const handleSearch = useCallback(() => {
    history.push('/search')
  }, [])

  const handleSearchProtecctionist = useCallback(() => {
    history.push(SEARCH_PROTECTIONIST)
  }, [])

  const handleDeletePet = useCallback(id => {
    adopterStore.removePet(id)
  }, [])

  const { petsList, totalPets } = adopterStore

  return (
    <LayoutContainer>
      <SEO pageTitle={t('dashboard')} />
      <Title mBottom="30px" title={t('dashboard')} />
      <div className={styles.container}>
        <DashboardCard
          titleCard={t('addPet')}
          handleClick={handleCreatePet}
          icon={<AiFillFileAdd size={25} />}
        />
        <DashboardCard titleCard={t('common:myPets')} total={totalPets} />
        <DashboardCard
          handleClick={handleSearch}
          icon={<MdSearch size={25} />}
          titleCard={t('navbar:searchPets')}
        />
        <DashboardCard
          titleCard={t('searchShelters')}
          icon={<FaPeopleCarry size={22} />}
          handleClick={handleSearchProtecctionist}
        />
      </div>
      <ListPets
        page={page}
        limit={limit}
        listPets={petsList}
        totalPets={totalPets}
        handleDelete={handleDeletePet}
        handleChangePage={handleChangePage}
        title={totalPets > 1 ? t('common:myPets') : t('common:myPet')}
      />
    </LayoutContainer>
  )
}

export default observer(DashboardAdopter)

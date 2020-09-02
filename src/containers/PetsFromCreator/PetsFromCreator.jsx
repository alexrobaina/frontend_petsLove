import React from 'react'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { MdSearch } from 'react-icons/md'
import ContainerPetsCards from 'components/ContainerPetsCards'
import Input from 'components/commons/Input'
import Title from 'components/commons/Title'
import PaginationList from 'components/commons/PaginationList'

const PetsFromCreator = ({
  page,
  title,
  limit,
  listPets,
  isLoading,
  totalPets,
  handleSearch,
  handleChangePage,
}) => {
  const { t } = useTranslation()

  return (
    <>
      <Title mTop="50px" mBottom="30px" title={title} />
      <Input
        isEdit
        handleChange={handleSearch}
        icon={<MdSearch size={20} />}
        placeholder={t('common:filterForName')}
      />
      <ContainerPetsCards isLoading={isLoading} pets={listPets} />
      {totalPets !== 0 && (
        <PaginationList
          page={page}
          limit={limit}
          total={totalPets}
          handleChange={handleChangePage}
        />
      )}
    </>
  )
}

PetsFromCreator.prototype = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default observer(PetsFromCreator)

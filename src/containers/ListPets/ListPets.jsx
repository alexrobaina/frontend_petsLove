import React from 'react'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { MdSearch } from 'react-icons/md'
import ContainerPetsCards from 'components/ContainerPetsCards'
import Input from 'components/commons/Input'
import Title from 'components/commons/Title'
import PaginationList from 'components/commons/PaginationList'

const ListPets = ({
  page,
  title,
  limit,
  listPets,
  isLoading,
  totalPets,
  handleDelete,
  handleSearch,
  handleChangePage,
}) => {
  const { t } = useTranslation()

  return (
    <>
      <Title mTop="50px" mBottom="30px" title={title} />
      {handleSearch && (
        <Input
          isEdit
          handleChange={handleSearch}
          icon={<MdSearch size={20} />}
          placeholder={t('common:filterForName')}
        />
      )}
      <ContainerPetsCards handleDelete={handleDelete} isLoading={isLoading} pets={listPets} />
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

ListPets.prototype = {
  handleSearch: PropTypes.func,
  handleDelete: PropTypes.func,
  id: PropTypes.string.isRequired,
  handleChangePage: PropTypes.func,
  page: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  limit: PropTypes.number.isRequired,
  listPets: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  totalPets: PropTypes.number.isRequired,
}

ListPets.defaultProps = {
  handleSearch: null,
  handleDelete: null,
  handleChangePage: null,
}

export default observer(ListPets)

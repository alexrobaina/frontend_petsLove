import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import { useTranslation } from 'react-i18next'
import FilterNavbar from 'components/FilterNavbar'
import ButtonIcon from 'components/commons/ButtonIcon'
import { MdClose } from 'react-icons/md'
import styles from './toggleFilter.scss'

const ToggleFilter = ({ handleToggle, toggle, optionsSelectsStore, searchPetsStore }) => {
  const { t } = useTranslation()

  return (
    <div className={c(toggle ? styles.open : styles.showMenu)}>
      <ButtonIcon onclick={handleToggle} icon={<MdClose size={25} />} />
      <div className={styles.titleNavbar}>
        <div>{t('navbar.moreFilters')}</div>
      </div>
      <div className={styles.containerSelects}>
        <FilterNavbar
          handleToggle={handleToggle}
          optionsSelectsStore={optionsSelectsStore}
          searchPetsStore={searchPetsStore}
        />
      </div>
    </div>
  )
}

ToggleFilter.propTypes = {
  handleToggle: PropTypes.func.isRequired,
  toggle: PropTypes.bool.isRequired,
  optionsSelectsStore: PropTypes.node.isRequired,
  searchPetsStore: PropTypes.node.isRequired,
}

export default ToggleFilter

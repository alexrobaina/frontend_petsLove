import React, { useCallback, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { observer, useLocalStore } from 'mobx-react'
import InputSelect from 'components/commons/InputSelect'
import GoogleAutocomplete from 'components/commons/GoogleAutocomplete/GoogleAutocomplete'
import FilterSearchPetsStore from 'stores/FilterSearchPetsStore'
import PetsFiltered from 'containers/PetsFiltered'
import styles from './initialFilters.scss'

const InitialFilters = () => {
  const [keyPressed, setKeyPressed] = useState(false)
  const filterSearchPetsStore = useLocalStore(() => new FilterSearchPetsStore())
  const { t } = useTranslation('search')

  const useKeyPress = targetKey => {
    // State for keeping track of whether key is pressed

    // If pressed key is our target key then set to true
    function downHandler({ key }) {
      if (key === targetKey) {
        setKeyPressed(true)
      }
    }

    // If released key is our target key then set to false
    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false)
      }
    }

    // Add event listeners
    useEffect(() => {
      window.addEventListener('keydown', downHandler)
      window.addEventListener('keyup', upHandler)
      // Remove event listeners on cleanup
      return () => {
        window.removeEventListener('keydown', downHandler)
        window.removeEventListener('keyup', upHandler)
      }
    }, []) // Empty array ensures that effect is only run on mount and unmount

    return keyPressed
  }

  const keyPress = useKeyPress('Enter')

  const handleSearch = () => {
    filterSearchPetsStore.searchPets(10, 1)
  }

  const handleChanceCategory = useCallback(selectedValue => {
    filterSearchPetsStore.setCategory(selectedValue.value)
    handleSearch()
  })

  const handleChanceGender = useCallback(selectedValue => {
    filterSearchPetsStore.setGender(selectedValue.value)
    handleSearch()
  })

  const handleChangeTextAddress = useCallback(address => {
    filterSearchPetsStore.setTextAddress(address)
    filterSearchPetsStore.city.setValue('')
    filterSearchPetsStore.country.setValue('')
  })

  const { textAddress, category, gender } = filterSearchPetsStore

  const handleChangeAddressComponents = useCallback(addressComponent => {
    filterSearchPetsStore.setAddressComponents(addressComponent)
  }, [])

  useEffect(() => {
    if (keyPress) {
      handleSearch()
    }
  }, [keyPress])

  return (
    <>
      <div className={styles.containerGoogleAutocomplete}>
        <div className={styles.googleAutocomplete}>
          <GoogleAutocomplete
            isEdit
            focusActive
            value={textAddress.value}
            handleSearch={handleSearch}
            inputStoreError={textAddress}
            label={t('labelGoogleAutocomplete')}
            placeholder={t('placeholderGoogleAutocomplete')}
            handleChangeTextAddress={handleChangeTextAddress}
            handleChangeAddressComponents={handleChangeAddressComponents}
          />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.selectCategory}>
          <InputSelect
            isEdit
            inputStore={category}
            value={category.value}
            placeholder={t('category')}
            label={t('common:typeOfPet')}
            handleChange={handleChanceCategory}
            options={[
              { value: '', label: t('searchAllCategory') },
              { value: 'dog', label: t('common:dogs') },
              { value: 'cat', label: t('common:cats') },
              { value: 'exotic', label: t('common:exotic') },
            ]}
          />
        </div>
        <div className={styles.selectGender}>
          <InputSelect
            isEdit
            inputStore={gender}
            value={gender.value}
            label={t('common:sex')}
            placeholder={t('common:sex')}
            handleChange={handleChanceGender}
            options={[
              { value: '', label: t('searchAllCategory') },
              { value: 'female', label: t('common:female') },
              { value: 'male', label: t('common:male') },
            ]}
          />
        </div>
      </div>
      <PetsFiltered store={filterSearchPetsStore} />
    </>
  )
}

export default observer(InitialFilters)

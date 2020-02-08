import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import InputSelect from 'components/commons/InputSelect'
import InputCheckbox from 'components/commons/InputCheckbox'
import Button from 'components/commons/Button'
import styles from './filterNavbar.scss'

function FilterNavbar({ searchPetsStore, optionsSelectsStore }) {

    const handleSetLocation = useCallback(selectedValue => {
        optionsSelectsStore.setCountry(selectedValue)
        optionsSelectsStore.setOptionsCities(selectedValue)
        searchPetsStore.setCountry(selectedValue)
    })

    const handleSetCity = useCallback(selectedValue => {
        searchPetsStore.setCity(selectedValue)
    })

    const handleSetCategorie = useCallback(selectedValue => {
        searchPetsStore.setCategory(selectedValue)
    })

    const handleSetActivity = useCallback(selectedValue => {
        searchPetsStore.setActivity(selectedValue)
    })

    const handleSetGender = useCallback(selectedValue => {
        searchPetsStore.setGender(selectedValue)
    })

    const handleSetAge = useCallback(selectedValue => {
        searchPetsStore.setAge(selectedValue)
    })

    const handleSetLost = useCallback(() => {
        searchPetsStore.setLost()
    })

    const handleSetDewormed = useCallback(() => {
        searchPetsStore.setDewormed()
    })

    const handleSetVaccianated = useCallback(() => {
        searchPetsStore.setVaccianated()
    })

    const handleSetUrgent = useCallback(() => {
        searchPetsStore.setUrgent()
    })

    const handleSetSterilized = useCallback(() => {
        searchPetsStore.setSterilized()
    })

    const submitSearch = useCallback((() => {
        searchPetsStore.searchPets()
    }))

    useEffect(() => {
        optionsSelectsStore.listContries()
        optionsSelectsStore.listGender()
        optionsSelectsStore.listCategories()
        optionsSelectsStore.listAges()
        optionsSelectsStore.listActiviy()
    }, [])

    return (
        <div className={styles.InputContainer}>
            <div className={styles.fromNewSearch}>
                {searchPetsStore.cLearSelectCountry &&
                <InputSelect
                    handleChange={handleSetLocation}
                    options={optionsSelectsStore.countries}
                    placeholder={'Country'}/>
                }
            </div>
            <div className={styles.fromNewSearch}>
                {searchPetsStore.cLearSelectCity &&
                <InputSelect
                    handleChange={handleSetCity}
                    options={optionsSelectsStore.cities}
                    placeholder={'City'}/>
                }
            </div>
            <div className={styles.fromNewSearch}>
                {searchPetsStore.cLearSelectCategorie &&
                <InputSelect
                    options={optionsSelectsStore.categories}
                    handleChange={handleSetCategorie}
                    placeholder={'Type of pets'}/>
                }
            </div>
            <div className={styles.fromNewSearch}>
                {searchPetsStore.cLearSelectGender &&
                <InputSelect
                    handleChange={handleSetGender}
                    options={optionsSelectsStore.gender}
                    placeholder={'Gender'}/>
                }
            </div>
            <div className={styles.fromNewSearch}>
                {searchPetsStore.cLearSelectAge &&
                <InputSelect
                    handleChange={handleSetAge}
                    options={optionsSelectsStore.ages}
                    placeholder={'Age'}/>
                }
            </div>
            <div className={styles.fromNewSearch}>
                {searchPetsStore.cLearSelectActivity &&
                <InputSelect
                    handleChange={handleSetActivity}
                    options={optionsSelectsStore.activity}
                    placeholder={'Activity'}/>
                }
            </div>
            <div className={styles.togoleContainer}>
                <InputCheckbox
                    value={searchPetsStore.lost}
                    handleChange={handleSetLost}
                    text="Lost"/>
            </div>
            <div className={styles.togoleContainer}>
                <InputCheckbox
                    value={searchPetsStore.urgent}
                    handleChange={handleSetUrgent}
                    text="Urgent"/>
            </div>
            <div className={styles.togoleContainer}>
                <InputCheckbox
                    value={searchPetsStore.dewormed}
                    handleChange={handleSetDewormed}
                    text="Dewormed"/>
            </div>
            <div className={styles.togoleContainer}>
                <InputCheckbox
                    value={searchPetsStore.vaccianated}
                    handleChange={handleSetVaccianated}
                    text="Vaccianated"/>
            </div>
            <div className={styles.togoleContainer}>
                <InputCheckbox
                    value={searchPetsStore.sterilized}
                    handleChange={handleSetSterilized}
                    text="Sterilized"/>
            </div>
            <div className={styles.buttonFilter}>
                <Button
                    circle
                    handleSearch={submitSearch}
                    type="button"
                    text="Search"/>
            </div>
        </div>
    )
}

FilterNavbar.Proptypes = {
    searchPetsStore: PropTypes.object.isRequired,
    optionsSelectsStore: PropTypes.object.isRequired,
}


export default observer(FilterNavbar)

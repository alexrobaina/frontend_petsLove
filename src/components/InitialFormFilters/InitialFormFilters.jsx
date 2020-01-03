import React from 'react'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router-dom';
import InitialFormFiltersStore from '../../stores/InitialFormFiltersStore'
import ListPetsStore from '../../stores/ListPetsStore'
import InputSelect from '../commons/InputSelect'
import Button from '../commons/Button/Button'
import styles from './initialFormFilters.module.scss'

@observer
class InitialFormFilters extends React.Component {
  constructor(props) {
    super(props)

    this.initialFormFiltersStore = new InitialFormFiltersStore()
    this.listPetsStore = new ListPetsStore()
  }

  componentDidMount() {
    this.initialFormFiltersStore.listContries()
    this.initialFormFiltersStore.listGender()
    this.initialFormFiltersStore.listCategoriesPets()
  }

  handleChance = selectedValue => {
    this.initialFormFiltersStore.setCountry(selectedValue)
    this.initialFormFiltersStore.setCities(selectedValue)
  }

  handleChanceCity = selectValue => {
    this.initialFormFiltersStore.setCity(selectValue)
  }

  handleChanceCategory = selectValue => {
    this.initialFormFiltersStore.setCategory(selectValue)
  }

  handleChanceGender = selectValue => {
    this.initialFormFiltersStore.setGender(selectValue)
  }

  // Esta función tiene que enviar por params o en el local storage todos los campos de busqueda
  // y enviar al componente listPetes que es el componente con menu de busqueda etc...
  handleSearch = () => {
    const { history } = this.props
    this.initialFormFiltersStore.saveSearchLocalStorage()
    // create routes and send components SearchPets
    history.push('/listPets')
  }

  render() {
    return (
      <div>
        <div className={styles.container}>
          <div className={styles.select1}>
            <InputSelect
              handleChange={this.handleChance}
              options={this.initialFormFiltersStore.countries}
              placeholder={'Country'}
              isLoading={this.initialFormFiltersStore.isLoading}
            />
          </div>
          <div className={styles.select2}>
            <InputSelect
              handleChange={this.handleChanceCity}
              placeholder={'City'}
              isLoading={this.initialFormFiltersStore.isLoading}
              options={this.initialFormFiltersStore.cities}
            />
          </div>
          <div className={styles.select3}>
            <InputSelect
              handleChange={this.handleChanceCategory}
              options={this.initialFormFiltersStore.categoriesPets}
              placeholder={'Type of pet'}
              isLoading={this.initialFormFiltersStore.isLoading}
            />
          </div>
          <div className={styles.select4}>
            <InputSelect
              handleChange={this.handleChanceGender}
              options={this.initialFormFiltersStore.typeGender}
              placeholder={'Gender'}
              isLoading={this.initialFormFiltersStore.isLoading}
            />
          </div>
          <div className={styles.btnSearch}>
            <Button
              handleSearch={this.handleSearch}
              type="button"
              styleButton="primary"
              text="Search"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(InitialFormFilters)

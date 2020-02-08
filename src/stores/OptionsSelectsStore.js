import { observable, action, runInAction, computed } from 'mobx'
import _ from 'lodash'
import LocationsService from '../services/LocationsService'
import GenderService from '../services/GenderService'
import CategoriesPetsService from '../services/CategoriesPetsService'
import PetsAgesServices from '../services/PetsAgesService/PetesAgesServices'
import ActivityService from '../services/ActivityService'

class OptionsSelectsStore {
	constructor() {
		this.locationsService = new LocationsService()
		this.genderServices = new GenderService()
		this.categoriesPetsService = new CategoriesPetsService()
		this.petsAgesService = new PetsAgesServices()
		this.activityService = new ActivityService()
	}
	
	@observable cities = []
	@observable countries = []
	@observable gender = []
	@observable categories = []
	@observable ages = []
	@observable activity = []
	@observable isLoading = false
	
	@action
	async listContries() {
		try {
			const response = await this.locationsService.getCountries()
			
			runInAction(() => {
				this.countries = []
				this.countries = response
			})
		} catch (e) {
			runInAction(() => {
				console.log(e)
			})
		}
	}
	
	@action
	async listCitiesUnitedState() {
		try {
			const response = await this.locationsService.getCitiesUnitedState()
			
			runInAction(() => {
				this.cities = response
			})
		} catch (e) {
			runInAction(() => {
				console.log(e)
			})
		}
	}
	
	@action
	async listCitiesArgentina() {
		try {
			const response = await this.locationsService.getCitiesArgentina()
			
			runInAction(() => {
				this.cities = response
			})
		} catch (e) {
			runInAction(() => {
				console.log(e)
			})
		}
	}
	
	@action
	async listGender() {
		
		try {
			const response = await this.genderServices.getTypePets()
			
			runInAction(() => {
				this.gender = this.formatDataReactSelect(response, 'name')
				this.gender.push({ value: '', label: 'All genders' })
				this.gender = this.gender.slice().reverse()
			})
		} catch (e) {
			runInAction(() => {
				console.log(e)
			})
		}
	}
	
	@action
	async listCategories() {
		try {
			const response = await this.categoriesPetsService.getTypePets()
			
			runInAction(() => {
				this.categories = this.formatDataReactSelect(response, 'name')
				this.categories.push({ value: '', label: 'All Categories' })
				this.categories = this.categories.slice().reverse()
			})
		} catch (e) {
			runInAction(() => {
				console.log(e)
			})
		}
	}
	
	@action
	async listAges() {
		try {
			const response = await this.petsAgesService.getAge()
			
			runInAction(() => {
				this.ages = this.formatDataReactSelect(response, 'age')
				this.ages.push({ value: '', label: 'All Ages' })
				this.ages = this.ages.slice().reverse()
			})
		} catch (e) {
			runInAction(() => {
				console.log(e)
			})
		}
	}
	
	@action
	async listActiviy() {
		try {
			const response = await this.activityService.getActivity()
			
			runInAction(() => {
				this.activity = this.formatDataReactSelect(response, 'activity')
				this.activity.push({ value: '', label: 'All' })
				this.activity = this.activity.slice().reverse()
			})
		} catch (e) {
			runInAction(() => {
				console.log(e)
			})
		}
	}
	
	@action
	formatDataReactSelect(data, nameObject) {
		const result = []
		data.forEach(item => {
			if (nameObject === 'age') {
				result.push(_.zipObject(['value', 'label'], [item._id, item.age]))
			}
			if (nameObject === 'activity') {
				result.push(_.zipObject(['value', 'label'], [item._id, item.activity]))
			}
			if (nameObject === 'name') {
				result.push(_.zipObject(['value', 'label'], [item._id, item.name]))
			}
		})
		return result
	}
	
	@action
	setOptionsCities() {
		if (this.country === 'unitedStates') {
			this.listCitiesUnitedState()
		}
		if (this.country === 'argentina') {
			this.listCitiesArgentina()
		}
	}
	
	@action
	setLoadingTrue() {
		this.isLoading = true
	}
	
	@action
	setLoadingFalse() {
		this.isLoading = false
	}
	
	@action
	setCountry(value) {
		this.countryLabel = value.label
		this.country = value.value
	}
	
	@action
	resetOptionValueSelects() {
		
	}
}

export default OptionsSelectsStore

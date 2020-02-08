import React from 'react'
import { useLocalStore } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import OptionsSelectsStore from '../../stores/OptionsSelectsStore'
import SearchPetsStore from '../../stores/SearchPetsStore'
import InitialLogo from 'components/InitialLogo'
import InitialFilters from 'components/InitialFilters'
import Title from 'components/commons/Title'
import LayoutContainer from 'components/commons/LayoutContainer'
import Navbar from 'components/commons/Navbar'
import styles from './home.scss'

const Home = () => {
	const searchPetsStore = useLocalStore(() => new SearchPetsStore())
	const optionsSelectsStore = useLocalStore(() => new OptionsSelectsStore())
	
	// const { t } = useTranslation('rulesCreation')
	return (
		<>
			<Navbar optionsSelectsStore={optionsSelectsStore} searchPetsStore={searchPetsStore}
							className={styles.fixedNavbar} timeAnimation={3200}/>
			<LayoutContainer>
				<InitialLogo/>
				<Title
					timeAnimation={3600}
					title="Search for your best friend"
					subTitle="Do not buy a breed pet, adopt a homeless one"
				/>
				<InitialFilters optionsSelectsStore={optionsSelectsStore} searchPetsStore={searchPetsStore}/>
			</LayoutContainer>
		</>
	)
}
export default Home

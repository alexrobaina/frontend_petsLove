import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import InputCheckbox from 'components/commons/InputCheckbox'
import CreatePetStore from 'stores/CreatePetStore'
import LayoutForm from 'components/commons/LayoutForm'
import OptionsSelectsStore from 'stores/OptionsSelectsStore'
import PhoneInput from "react-phone-input-2"
import Label from 'components/commons/Label/Input'
import Textarea from 'components/commons/Textarea/Textarea'
import styles from './informationUserPet.scss'

const InformationUserPet = ({ createPetStore }) => {
	const { t } = useTranslation('createPet')
	
	
	const handleChangeShelter = useCallback(() => {
		// createPetStore.setShelter()
	}, [])
	
	const handleChangePetOwnership = useCallback(() => {
		// createPetStore.setPetOwnership()
	}, [])
	
	return (
		<LayoutForm>
			<div className={styles.subtitle}>{t('Refuge or rescue data')}</div>
			<div className={styles.colums}>
				<InputCheckbox
					isEdit
					value={createPetStore.pet.lost}
					handleChange={handleChangeLost}
					text={t('¿Es una mascota perdida?')}
				/>
			</div>
			<div className={styles.colums}>
				<Label text={'Telefono de contacto para adoptar a esta mascota'} />
				<PhoneInput
					label="Contact number of the person responsible for the pet..."
					country="ar"
					onChange={phone => handleChangePhone(phone)}
					inputStyle={{ width: '100%', height: '40px', borderColor: '#ffd95a'  }}
				/>
			</div>
			<div className={styles.colums}>
				<Textarea label="Requisitos para adoptar" isEdit rows={5} />
			</div>
		</LayoutForm>
	)
}

InformationUserPet.propTypes = {
	createPetStore: PropTypes.instanceOf(CreatePetStore).isRequired,
	optionsSelectsStore: PropTypes.instanceOf(OptionsSelectsStore).isRequired,
}

export default InformationUserPet
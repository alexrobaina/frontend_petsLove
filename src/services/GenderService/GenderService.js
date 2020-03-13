import i18next from 'i18next'

class GenderService {
  getGender = () => {
    const gender = [
      { value: '', label: i18next.t('selectGender.allGenders') },
      { value: 'female', label: i18next.t('selectGender.female') },
      { value: 'male', label: i18next.t('selectGender.male') },
    ]
    return gender
  }
}

export default GenderService

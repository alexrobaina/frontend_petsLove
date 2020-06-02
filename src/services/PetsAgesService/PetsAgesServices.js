import i18next from 'i18next'

class PetsAgesServices {
  getAge = () => {
    const ageOptions = [
      { value: '1month', label: i18next.t('1month') },
      { value: '2month', label: i18next.t('2month') },
      { value: '3month', label: i18next.t('3month') },
      { value: '4month', label: i18next.t('4month') },
      { value: '5month', label: i18next.t('5month') },
      { value: '6month', label: i18next.t('6month') },
      { value: '7month', label: i18next.t('7month') },
      { value: '8month', label: i18next.t('8month') },
      { value: '9month', label: i18next.t('9month') },
      { value: '10month', label: i18next.t('10month') },
      { value: '11month', label: i18next.t('11month') },
      { value: '12month', label: i18next.t('12month') },
      { value: '1year', label: i18next.t('1year') },
      { value: '2year', label: i18next.t('2year') },
      { value: '3year', label: i18next.t('3year') },
      { value: '4year', label: i18next.t('4year') },
      { value: '5year', label: i18next.t('5year') },
      { value: '6year', label: i18next.t('6year') },
      { value: '7year', label: i18next.t('7year') },
      { value: '8year', label: i18next.t('8year') },
      { value: '9year', label: i18next.t('9year') },
      { value: '10year', label: i18next.t('10year') },
      { value: '11year', label: i18next.t('11year') },
      { value: '12year', label: i18next.t('12year') },
    ]
    return ageOptions
  }
}

export default PetsAgesServices

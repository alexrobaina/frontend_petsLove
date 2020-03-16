import i18next from 'i18next'

class PetsAgesServices {
  getAge = () => {
    const age = [
      { value: '', label: i18next.t('selectAge.allAges') },
      { value: '1month', label: i18next.t('selectAge.1month') },
      { value: '2month', label: i18next.t('selectAge.2month') },
      { value: '3month', label: i18next.t('selectAge.3month') },
      { value: '4month', label: i18next.t('selectAge.4month') },
      { value: '5month', label: i18next.t('selectAge.5month') },
      { value: '6month', label: i18next.t('selectAge.6month') },
      { value: '7month', label: i18next.t('selectAge.7month') },
      { value: '8month', label: i18next.t('selectAge.8month') },
      { value: '9month', label: i18next.t('selectAge.9month') },
      { value: '10month', label: i18next.t('selectAge.10month') },
      { value: '11month', label: i18next.t('selectAge.11month') },
      { value: '12month', label: i18next.t('selectAge.12month') },
      { value: '1year', label: i18next.t('selectAge.1year') },
      { value: '2year', label: i18next.t('selectAge.2year') },
      { value: '3year', label: i18next.t('selectAge.3year') },
      { value: '4year', label: i18next.t('selectAge.4year') },
      { value: '5year', label: i18next.t('selectAge.5year') },
      { value: '6year', label: i18next.t('selectAge.6year') },
      { value: '7year', label: i18next.t('selectAge.7year') },
      { value: '8year', label: i18next.t('selectAge.8year') },
      { value: '9year', label: i18next.t('selectAge.9year') },
      { value: '10year', label: i18next.t('selectAge.10year') },
      { value: '11year', label: i18next.t('selectAge.11year') },
      { value: '12year', label: i18next.t('selectAge.12year') },
    ]
    return age
  }
}

export default PetsAgesServices

import i18next from 'i18next'

class CategoriesPetsService {
  getTypePets = () => {
    const category = [
      { value: '', label: i18next.t('allCategories') },
      { value: 'dog', label: i18next.t('dogs') },
      { value: 'cat', label: i18next.t('cats') },
    ]
    return category
  }
}

export default CategoriesPetsService

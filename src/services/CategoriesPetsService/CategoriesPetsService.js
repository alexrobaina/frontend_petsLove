import i18next from 'i18next'

class CategoriesPetsService {
  getTypePets = () => {
    const category = [
      { value: '', label: i18next.t('selectCategory.allCategory') },
      { value: 'dog', label: i18next.t('selectCategory.dogs') },
      { value: 'cat', label: i18next.t('selectCategory.cats') },
    ]
    return category
  }
}

export default CategoriesPetsService

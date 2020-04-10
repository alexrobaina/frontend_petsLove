import i18next from 'i18next'

class CategoriesPetsService {
  getTypePets = () => {
    const category = [
      { value: '', label: i18next.t('createPet:allCategories') },
      { value: 'dog', label: i18next.t('createPet:dogs') },
      { value: 'cat', label: i18next.t('createPet:cats') },
    ]
    return category
  }
}

export default CategoriesPetsService

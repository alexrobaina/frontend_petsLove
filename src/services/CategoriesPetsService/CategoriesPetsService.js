class CategoriesPetsService {
  getTypePets = () => {
    const category = [
      { value: '', label: 'allCategory' },
      { value: 'dog', label: 'dogs' },
      { value: 'cat', label: 'cats' },
    ]
    return category
  }
}

export default CategoriesPetsService

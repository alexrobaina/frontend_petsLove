import zipObject from 'lodash/zipObject'

class Utils {
  shortenText = (text, numberOfLetters) => {
    if (text.length > numberOfLetters) {
      return `${text.substring(0, numberOfLetters)}...`
    }
    return text
  }

  // this function format data for selects
  formatDataReactSelect = (data, nameObject) => {
    const result = []
    data.forEach(item => {
      if (nameObject === 'age') {
        result.push(zipObject(['value', 'label'], [item._id, item.age]))
      }
      if (nameObject === 'activity') {
        result.push(zipObject(['value', 'label'], [item._id, item.activity]))
      }
      if (nameObject === 'name') {
        result.push(zipObject(['value', 'label'], [item._id, item.name]))
      }
    })
    return result
  }
}

export default Utils

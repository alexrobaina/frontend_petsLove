import zipObject from 'lodash/zipObject'

class Utils {
  shortenText = (text, numberOfLetters) => {
    if (text.length > numberOfLetters) {
      return `${text.substring(0, numberOfLetters)}...`
    }
    return text
  }

  // this function format data for selects
  formatReactSelectUsers = data => {
    const result = []

    data.forEach(item => {
      result.push(zipObject(['value', 'label'], [item._id, item.email]))
    })

    return result
  }
}

export default Utils

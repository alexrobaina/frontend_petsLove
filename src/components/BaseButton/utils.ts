export const setType = (type: string) => {
  switch (type) {
    case 'primary':
      return 'block rounded-md bg-primary-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600'
    case 'secondary':
      return 'rounded px-2 py-1 text-sm font-semibold text-primary-950 shadow-sm ring-1 ring-inset ring-primary-300 hover:bg-primary-300'
    case 'tertiary':
      return 'bg-transparent hover:bg-primary-200 text-gray-600'
    default:
      return 'bg-blue-500 hover:bg-blue-700 text-white'
  }
}

export const setSize = (size: string) => {
  switch (size) {
    case 'small':
      return 'py-1 px-2 text-sm'
    case 'medium':
      return 'py-2 px-4 text-base'
    case 'large':
      return 'py-3 px-6 text-lg'
    default:
      return 'py-2 px-4 text-base'
  }
}

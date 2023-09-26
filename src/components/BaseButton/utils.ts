export const setType = (type: string) => {
  switch (type) {
    case 'primary':
      return 'sm:w-auto w-full block rounded-md bg-primary-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600'
    case 'secondary':
      return 'sm:w-auto w-full rounded px-2 py-1 text-sm font-semibold text-primary-950 shadow-sm ring-1 ring-inset ring-primary-300 hover:bg-primary-300'
    case 'tertiary':
      return 'sm:w-auto w-full bg-transparent hover:bg-primary-200 text-gray-600'
    case 'delete':
      return 'inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
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

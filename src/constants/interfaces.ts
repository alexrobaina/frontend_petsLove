export interface CustomPlaceResult {
  results: {
    formatted_address: string
    address_components: {
      long_name: string
      short_name: string
      types: string[]
    }[]
  }[]
}

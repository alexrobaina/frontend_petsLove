export interface CustomPlaceResult {
  results: {
    latLng: {
      lat: number
      lng: number
    }
    formatted_address: string
    address_components: {
      long_name: string
      short_name: string
      types: string[]
    }[]
  }[]
}

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

export interface LocationResult {
  results: {
    formatted_address: string
    address_components: IAddressComponent[]
  }[]
  latLng: {
    lat: number
    lng: number
  }
}

export interface IAddressComponent {
  long_name: string
  short_name: string
  types: string[]
}

export interface User {
  id: string
  username: string
  email: string
  image: string
  location: {
    country: string
    city: string
  }
  role: string
  socialMedia: {
    facebook: string
    instagram: string
    telegram: string
    whatsapp: string
  }
}

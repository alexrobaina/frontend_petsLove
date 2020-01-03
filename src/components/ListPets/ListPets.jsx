import React, { Component } from 'react'
import ListPetsStore from '../../stores/ListPetsStore'

class ListPets extends Component {
  constructor(props) {
    super(props)

    this.listPetsStore = new ListPetsStore()
  }

  render() {
    return (
      <div>
        hola
      </div>
    )
  }
}

export default ListPets

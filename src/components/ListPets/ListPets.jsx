import React, { Fragment } from 'react'
import { observer } from 'mobx-react'
import Navbar from '../commons/Navbar/Navbar'
import Card from '../commons/Card/Card'
import { MdCancel } from 'react-icons/md'
import styles from './listPets.module.scss'

const ListPets = ({ filters, pets, isLoading, handleDelete }) => {
  return (
    <Fragment>
      <Navbar />
      <div className={styles.containerFilters}>
        {filters.map(filter => (
          <div onClick={() => handleDelete(filter.value)} className={styles.filter}>
            {filter.value}
            <span className={styles.icons}>
              <MdCancel size={16} />
            </span>
          </div>
        ))}
      </div>
      <div className={styles.container}>
        {isLoading
          ? pets.map(pet => {
              return (
                <Card
                  className={styles.card}
                  key={pet._id}
                  image={pet.image}
                  namePet={pet.name}
                  history={
                    'Inmediatamente aparecerá el instalador y se iniciará VirtualBox. Si tenemos un pack más antiguo instalado nos notificará si queremos actualizarlo al más recientemente descargado.'
                  }
                />
              )
            })
          : 'loading... '}
      </div>
    </Fragment>
  )
}

export default ListPets

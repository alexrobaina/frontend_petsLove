import React, { useEffect } from 'react'
import { useLocalStore, observer } from 'mobx-react'
import { useParams } from 'react-router'
import noImage from 'components/commons/CardPets/noImage.svg'
import API_URL from 'config/config'
import PetIdStore from 'stores/PetIdStore'
import OptionsSelectsStore from 'stores/OptionsSelectsStore'
import SearchPetsStore from 'stores/SearchPetsStore'
import Navbar from 'components/commons/Navbar'
import LayoutContainer from 'components/commons/LayoutContainer'
import LayoutCards from 'components/commons/LayoutCards'
import styles from './profilePets.scss'
import TextCardInformation from '../../components/commons/TextCardInformation'

const ProfilePets = () => {
  const optionsSelectsStore = useLocalStore(() => new OptionsSelectsStore())
  const searchPetsStore = useLocalStore(() => new SearchPetsStore())
  const petIdStore = useLocalStore(() => new PetIdStore())
  const { id } = useParams()

  useEffect(() => {
    petIdStore.getPetId(id)
  }, [])
  console.log(petIdStore.pet.categorie)
  return (
    <div>
      <Navbar optionsSelectsStore={optionsSelectsStore} searchPetsStore={searchPetsStore} />
      <LayoutContainer>
        <div className={styles.containerCard}>
          <LayoutCards width="100%" margin="10px">
            <img
              className={styles.imagePet}
              src={petIdStore.imagesPet[0] ? `${API_URL}${petIdStore.imagesPet[0]}` : noImage}
              alt="photos-pet"
            />
            <div className={styles.name}>{petIdStore.pet.name}</div>
          </LayoutCards>
          <LayoutCards width="100%" margin="10px">
            <div className={styles.containerInfo}>
              <div className={styles.info}>
                <TextCardInformation text="Country" value={petIdStore.pet.country} />
                <TextCardInformation text="City" value={petIdStore.pet.city} />
                <TextCardInformation text="Type of pet" value={petIdStore.pet.name} />
                <TextCardInformation text="Country" value={petIdStore.pet.country} />
                <TextCardInformation text="City" value={petIdStore.pet.city} />
                <TextCardInformation text="Type of pet" value={petIdStore.pet.name} />
              </div>
            </div>
          </LayoutCards>
        </div>
      </LayoutContainer>
    </div>
  )
}

export default observer(ProfilePets)

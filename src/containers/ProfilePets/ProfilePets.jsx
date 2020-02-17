import React, { useEffect } from 'react'
import { useLocalStore, observer } from 'mobx-react'
import c from 'classnames'
import { useParams } from 'react-router'
import noImage from 'components/commons/CardPets/noImage.svg'
import API_URL from 'config/config'
import PetIdStore from 'stores/PetIdStore'
import OptionsSelectsStore from 'stores/OptionsSelectsStore'
import SearchPetsStore from 'stores/SearchPetsStore'
import TextCardInformation from 'components/commons/TextCardInformation'
import Navbar from 'components/commons/Navbar'
import LayoutContainer from 'components/commons/LayoutContainer'
import PlaceMarkMap from 'components/commons/PlaceMarkMap'
import LayoutCards from 'components/commons/LayoutCards'
import Title from 'components/commons/Title'
import Button from 'components/commons/Button'
import { GiWorld, GiJumpingDog, GiLoveInjection } from 'react-icons/gi'
import { IoIosHelpBuoy } from 'react-icons/io'
import { MdPets } from 'react-icons/md'
import { FaTransgender, FaBirthdayCake, FaCat, FaStreetView } from 'react-icons/fa'
import Footer from 'components/commons/Footer/Footer'
import GaleryImages from 'components/commons/GaleryImages'
import styles from './profilePets.scss'

const ProfilePets = () => {
  const optionsSelectsStore = useLocalStore(() => new OptionsSelectsStore())
  const searchPetsStore = useLocalStore(() => new SearchPetsStore())
  const petIdStore = useLocalStore(() => new PetIdStore())
  const { id } = useParams()

  useEffect(() => {
    petIdStore.getPetId(id)
  }, [])

  const { name } = petIdStore.pet
  const { isLoading, images } = petIdStore

  return (
    <>
      <Navbar optionsSelectsStore={optionsSelectsStore} searchPetsStore={searchPetsStore} />
      <LayoutContainer>
        <div className={styles.name}>
          <Title title={`My name is ${name}`} />
        </div>
        <div className={c(styles.containerCard, styles.layourCard)}>
          <div className={c(styles.column, styles.containerImagePet)}>
            <div>
              <img
                className={styles.imagePet}
                src={petIdStore.imagePet[0] ? `${API_URL}${petIdStore.imagePet[0]}` : noImage}
                alt="photos-pet"
              />
            </div>
            <div className={styles.containerButtons}>
              <div className={c(styles.button, styles.btnMargin)}>
                <Button bigButton text="adopt" />
              </div>
              <div className={styles.button}>
                <Button bigButton text="Contact Protecctionist" />
              </div>
            </div>
          </div>
          <div className={c(styles.column, styles.containerMap)}>
            <PlaceMarkMap
              // addressPet={addressPet}
              contactMessage={`You can call for adopt to ${petIdStore.pet.name} phone: ${
                petIdStore.pet.phone ? petIdStore.pet.phone : ''
              }`}
            />
          </div>
          <div className={styles.column}>
            <LayoutCards>
              <div className={styles.containerInfo}>
                <div className={styles.info}>
                  <TextCardInformation
                    icon={<FaBirthdayCake size={25} />}
                    text="Age"
                    value={petIdStore.age}
                  />
                  <TextCardInformation
                    icon={<FaCat size={25} />}
                    text="Type of pet"
                    value={petIdStore.categorie}
                  />
                  <TextCardInformation
                    icon={<FaTransgender size={25} />}
                    text="Gender"
                    value={petIdStore.gender}
                  />
                  <TextCardInformation
                    icon={<GiJumpingDog size={25} />}
                    text="Activity"
                    value={petIdStore.activity}
                  />
                  <TextCardInformation
                    icon={<FaStreetView size={25} />}
                    text="Its lost"
                    valueBool={petIdStore.pet.lost}
                  />
                  <TextCardInformation
                    icon={<GiLoveInjection size={25} />}
                    text="Vaccinated"
                    valueBool={petIdStore.pet.vaccinated}
                  />
                  <TextCardInformation
                    icon={<IoIosHelpBuoy size={25} />}
                    text="Urgent"
                    valueBool={petIdStore.pet.urgent}
                  />
                  <TextCardInformation
                    icon={<MdPets size={25} />}
                    text="Sterilized"
                    valueBool={petIdStore.pet.sterilized}
                  />
                </div>
              </div>
            </LayoutCards>
          </div>
          <div className={styles.column}>
            <div className={styles.containerhistory}>
              <LayoutCards>
                <div className={styles.historyPets}>
                  <div className={styles.titleHistory}>History</div>
                  <div className={styles.history}>{petIdStore.pet.history}</div>
                </div>
              </LayoutCards>
              <LayoutCards>
                <div className={styles.historyPets}>
                  <div className={styles.titleHistory}>Required to Adoption</div>
                  <div className={styles.history}>{petIdStore.pet.requiredToAdoption}</div>
                </div>
              </LayoutCards>
            </div>
          </div>
        </div>
        <GaleryImages isLoading={isLoading} arrayImages={images} />
      </LayoutContainer>
      <Footer />
    </>
  )
}

export default observer(ProfilePets)

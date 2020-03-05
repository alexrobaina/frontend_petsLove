import React from 'react'
import PropTypes from 'prop-types'
import { FaBirthdayCake, FaCat, FaStreetView, FaTransgender } from 'react-icons/fa'
import { GiJumpingDog, GiLoveInjection } from 'react-icons/gi'
import { IoIosHelpBuoy } from 'react-icons/io'
import { MdPets } from 'react-icons/md'
import LayoutCards from 'components/commons/LayoutCards'
import TextCardInformation from 'components/commons/TextCardInformation'
import styles from './informationPet.scss'

const InformationPet = ({ petIdStore }) => {
  return (
    <LayoutCards>
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
          informationPet={petIdStore.pet.lost}
        />
        <TextCardInformation
          icon={<GiLoveInjection size={25} />}
          text="Vaccinated"
          informationPet={petIdStore.pet.vaccinated}
        />
        <TextCardInformation
          icon={<IoIosHelpBuoy size={25} />}
          text="Urgent"
          informationPet={petIdStore.pet.urgent}
        />
        <TextCardInformation
          icon={<MdPets size={25} />}
          text="Sterilized"
          informationPet={petIdStore.pet.sterilized}
        />
      </div>
    </LayoutCards>
  )
}

InformationPet.propTypes = {
  petIdStore: PropTypes.node.isRequired,
}

export default InformationPet

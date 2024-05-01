import SwiperGallery from '../../../../components/common/SwiperGallery'
import { PetDetail } from '../../interfaces'
import { GeneralPetInfo } from '../GeneralPetInfo'
import { Guardians } from '../Guardians'
import { HealthData } from '../HealthData'
import { Location } from '../Location'
export interface IVaccine {
  id: string
  name: string
  date: string
  nextDueDate: string
}

interface Props {
  pet: PetDetail
  gotToUser(id: string): void
  getImagesWithUrlBucket: string[]
  checkIfUserIsOwner: () => boolean
  handleEditVaccine(data: IVaccine | unknown): void
  handleOpenModalDeleteVaccine(vaccine: IVaccine): void
}

export const PetView: React.FC<Props> = ({
  pet,
  gotToUser,
  handleEditVaccine,
  checkIfUserIsOwner,
  getImagesWithUrlBucket,
  handleOpenModalDeleteVaccine,
}) => {
  const {
    Vet,
    id,
    name,
    age,
    size,
    breed,
    gender,
    weight,
    qrCode,
    Shelter,
    Adopter,
    category,
    PetVaccine,
    description,
    MedicalRecord,
  } = pet

  return (
    <section className="mt-10">
      <GeneralPetInfo
        data={{
          id,
          name,
          age,
          size,
          breed,
          weight,
          gender,
          qrCode,
          category,
          description,
          shelter: Shelter,
        }}
      />
      {pet.Shelter?.location && <Location city={pet.Shelter?.location?.city} country={pet.Shelter?.location?.country} />}
      <div className="mt-10">
        <SwiperGallery slides={getImagesWithUrlBucket} />
      </div>
      <Guardians
        pet={{
          Shelter,
          Adopter,
          Vet,
        }}
        gotToUser={gotToUser}
      />
      <HealthData
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        pet={{
          PetVaccine,
          MedicalRecord,
        }}
        handleEditVaccine={handleEditVaccine}
        checkIfUserIsOwner={checkIfUserIsOwner}
        handleOpenModalDeleteVaccine={handleOpenModalDeleteVaccine}
      />
    </section>
  )
}

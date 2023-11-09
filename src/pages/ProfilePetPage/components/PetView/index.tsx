import SwiperGallery from '../../../../components/SwiperGallery'
import { IVaccine, PetDetail } from '../../interfaces'
import { GeneralPetInfo } from '../GeneralPetInfo'
import { Guardians } from '../Guardians'
import { HealthData } from '../HealthData'
import { Location } from '../Location'

interface Props {
  pet: PetDetail
  gotToUser(id: string): void
  petVaccines: IVaccine[]
  getImagesWithUrlBucket: string[]
  handleEditVaccine(id: string): void
  handleDeleteVaccine(id: string): void
}

export const PetView: React.FC<Props> = ({
  pet,
  gotToUser,
  petVaccines,
  handleEditVaccine,
  handleDeleteVaccine,
  getImagesWithUrlBucket,
}) => {
  return (
    <section className="mt-10">
      {pet &&
        [pet].map((pet: PetDetail) => (
          <div key={pet?.id}>
            <GeneralPetInfo pet={pet} />
            <Location
              city={pet?.location?.city}
              country={pet?.location?.country}
            />
            <div className="mt-10">
              <SwiperGallery slides={getImagesWithUrlBucket} />
            </div>
            <Guardians pet={pet} gotToUser={gotToUser} />
            <HealthData
              pet={pet}
              petVaccines={petVaccines}
              handleEditVaccine={handleEditVaccine}
              handleDeleteVaccine={handleDeleteVaccine}
            />
          </div>
        ))}
    </section>
  )
}

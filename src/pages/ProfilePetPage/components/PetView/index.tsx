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
  handleEditVaccine(data: IVaccine | unknown): void
  handleOpenModalDeleteVaccine(vaccine: IVaccine): void
}

export const PetView: React.FC<Props> = ({
  pet,
  gotToUser,
  handleEditVaccine,
  getImagesWithUrlBucket,
  handleOpenModalDeleteVaccine,
}) => {
  return (
    <section className="mt-10">
      {pet &&
        [pet].map((items) => (
          <div key={items?.id}>
            <GeneralPetInfo pet={items} />
            <Location
              city={items?.location?.city}
              country={items?.location?.country}
            />
            <div className="mt-10">
              <SwiperGallery slides={getImagesWithUrlBucket} />
            </div>
            <Guardians pet={items} gotToUser={gotToUser} />
            <HealthData
              pet={items}
              handleEditVaccine={handleEditVaccine}
              handleOpenModalDeleteVaccine={handleOpenModalDeleteVaccine}
            />
          </div>
        ))}
    </section>
  )
}

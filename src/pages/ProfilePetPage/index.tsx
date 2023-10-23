import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { IconLocation } from '../../assets/icons'
import { BaseLoading } from '../../components/BaseLoading'
import { Header } from '../../components/Header'
import SwiperGallery from '../../components/SwiperGallery'
import { PetDetail } from '../../constants/types'
import { useGetPet } from '../../hooks/useGetPet'

import { DetailCard } from './components/DetailCard'
import { VaccinesTable } from './components/VaccinesTable'
import { MedicalRecord } from './components/MedicalRecord'

export const ProfilePetPage: FC = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetPet(id)

  const petVaccines = data?.pet?.PetVaccine?.map(
    (vaccine: {
      Vaccine: {
        id: string
        name: string
        description: string
      }
    }) => {
      return {
        vaccine: vaccine.Vaccine,
      }
    },
  )

  const medicalRecord = data?.pet?.MedicalRecord?.map(
    (medicalRecord: {
      id: string
      name: string
      description: string
      diagnosis: string
      treatment: string
      medications: string[]
      followUpRequired: boolean
      followUpDate: Date
      clinicName: string
      notes: string
      attachments: string[]
    }) => {
      return {
        medicalRecord: medicalRecord,
      }
    },
  )

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-5">
          <Header title={data?.pet?.name} canBack />
        </div>
      </div>

      {data?.pet &&
        [data?.pet].map((pet: PetDetail) => {
          return (
            <section className="mt-16 pl-3 md:pl-6 md:pr-8 " key={pet?.id}>
              <div className="flex flex-wrap gap-4 lg:gap-x-0 justify-between mt-4 w-70 md:w-full lg:w-full">
                <DetailCard title="Category:" description={pet?.category} />
                <DetailCard title="Weight:" description={pet?.weight} />
                <DetailCard title="Breed:" description={pet?.breed} />
                <DetailCard title="Size:" description={pet?.size} />
                <DetailCard title="Gender:" description={pet?.gender} />
                <DetailCard title="Age:" description={pet?.age} />
              </div>
              <div className="mt-10 flex-col">
                <p className="text-lg leading-6 text-gray-950 w-full">
                  {pet?.description}
                </p>
                {pet?.location?.country && (
                  <div className="mt-10 flex items-center gap-2">
                    <IconLocation />
                    <p className=" text-xs font-semibold  leading-6 text-gray-400 w-full">
                      {pet?.location?.city}
                      {pet?.location?.country}
                    </p>
                  </div>
                )}
                <div className="mt-10">
                  <SwiperGallery slides={pet?.images} />
                </div>
              </div>

              {petVaccines && <VaccinesTable vaccines={petVaccines} />}
              {isLoading && (
                <div className="flex items-center w-full justify-center p-8">
                  <BaseLoading large />
                </div>
              )}

              <MedicalRecord record={medicalRecord} />
            </section>
          )
        })}
    </div>
  )
}

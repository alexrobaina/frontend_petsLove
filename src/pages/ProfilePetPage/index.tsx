import { FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { IconLocation } from '../../assets/icons'
import { BaseLoading } from '../../components/BaseLoading'
import { ContactCard } from '../../components/ContactCard'
import { Header } from '../../components/Header'
import SwiperGallery from '../../components/SwiperGallery'
import { PetDetail } from '../../constants/types'
import { useGetPet } from '../../hooks/useGetPet'

import { DetailCard } from './components/DetailCard'
import { MedicalRecord } from './components/MedicalRecord'
import { VaccinesTable } from './components/VaccinesTable'

export const ProfilePetPage: FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, isLoading } = useGetPet(id)

  const gotToUser = (id: string) => {
    navigate(`/user/${id}`)
  }

  const petVaccines = data?.pet?.PetVaccine?.map(
    (vaccine: {
      Vaccine: {
        id: string
        name: string
        description: string
      }
      status: string
    }) => {
      return {
        vaccine: vaccine.Vaccine,
        status: vaccine.status,
      }
    },
  )

  const handleEditVaccine = (id: string) => {
    console.log(id)

    // navigate(`/vaccine/${id}`)
  }

  const handleDeleteVaccine = (id: string) => {
    console.log(id)
  }

  const getImagesWithUrlBucket = data?.pet?.images?.map((image: string) => {
    return `${import.meta.env.VITE_BUCKET_NAME}${image}`
  })

  if (isLoading) return <BaseLoading large />

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-5">
          <Header title={data?.pet?.name} buttonBack />
        </div>
      </div>
      <section className="mt-10">
        {data?.pet &&
          [data?.pet].map((pet: PetDetail) => (
            <div key={pet?.id}>
              <div className="flex flex-wrap gap-4 lg:gap-x-0 justify-between mt-4 w-70 md:w-full lg:w-full">
                <DetailCard title="Category:" description={pet?.category} />
                <DetailCard title="Weight:" description={pet?.weight} />
                <DetailCard title="Breed:" description={pet?.breed} />
                <DetailCard title="Size:" description={pet?.size} />
                <DetailCard title="Gender:" description={pet?.gender} />
                <DetailCard title="Age:" description={pet?.age} />
              </div>
              <div className="flew-col gap-10 md:justify-between md:flex">
                <div className="mt-10 flex-col md:w-[50%]">
                  <div>
                    <h2 className="mt-10 text-lg font-semibold text-primary-900">
                      Description:
                    </h2>
                    <p className="text-base leading-6 text-gray-500 w-full mt-4">
                      {pet?.description}
                    </p>
                  </div>
                </div>
                <div className="mt-10 flex-col md:w-[50%]">
                  <h2 className="mt-10 text-lg font-semibold text-primary-900">
                    QR Code:
                  </h2>
                  <div className="flex-row gap-4 mt-4 md:flex ">
                    <img
                      alt="qrCode"
                      src={`${import.meta.env.VITE_BUCKET_NAME}${pet?.qrCode}`}
                      className="min-h-[150px] min-w-[150px] max-h-[150px] max-w-[150px]"
                    />
                    <p className="text-base leading-6 text-gray-500 w-full">
                      This is the QR code of your pet, you can use it to
                      identify it in case it gets lost. You can also use it to
                      register it in the shelter. Please download it and keep it
                      safe.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-10 flex-col">
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
                  <SwiperGallery slides={getImagesWithUrlBucket} />
                </div>
              </div>
              <h2 className="mt-10 text-lg font-semibold text-primary-900">
                Pet Guardians
              </h2>
              <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {pet?.Shelter && (
                  <div onClick={() => gotToUser(pet?.Shelter?.id)}>
                    <ContactCard
                      role="Shelter"
                      email={pet?.Shelter?.email}
                      className="cursor-pointer hover:bg-primary-100"
                      image={`${import.meta.env.VITE_BUCKET_NAME}${pet?.Shelter
                        ?.image}`}
                      name={pet?.Shelter?.username || pet?.Shelter?.firstName}
                      description="Go to the shelter to adopt me!"
                    />
                  </div>
                )}
                {pet?.Adopter && (
                  <ContactCard
                    role="Adopter"
                    email={pet?.Adopter?.email}
                    image={pet?.Adopter?.image}
                    description="Owner of this pet"
                    name={pet?.Shelter?.username || pet?.Shelter?.firstName}
                  />
                )}
              </div>
              <div className="mt-5 gap-6">
                <h2 className="mt-10 text-lg font-semibold text-primary-900">
                  Medical Record
                </h2>
                <MedicalRecord medicalRecord={pet.MedicalRecord} />
              </div>
              <h2 className="mt-10 text-lg font-semibold text-primary-900">
                Vaccines
              </h2>
              {petVaccines.length > 0 && (
                <VaccinesTable
                  vaccines={petVaccines}
                  handleEditVaccine={handleEditVaccine}
                  handleDeleteVaccine={handleDeleteVaccine}
                />
              )}
            </div>
          ))}
      </section>
    </div>
  )
}

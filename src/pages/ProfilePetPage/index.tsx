import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { IconLocation } from '../../assets/icons'
import { BaseLoading } from '../../components/BaseLoading'
import { Header } from '../../components/Header'
import SwiperGallery from '../../components/SwiperGallery'
import { PetDetail } from '../../constants/types'
import { useGetPet } from '../../hooks/useGetPet'

import { petDetailMockup } from './components/PetDetailmockup'
import { PetDetailData } from './components/PetdDetailData'
import { Vaccines } from './components/Vaccines'

export const ProfilePetPage: FC = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetPet(id)
  const petProfile = data?.filter((profile: PetDetail) => profile.id === id)

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-5">
          <Header
            title={petProfile?.map((profile: PetDetail) => profile.name)}
            canBack
          />
        </div>
      </div>

      {petProfile?.map((profile: PetDetail) => {
        return (
          <section className="mt-16 pl-3 md:pl-6 md:pr-8 " key={profile.id}>
            <div className="flex flex-wrap gap-4 lg:gap-x-0 justify-between mt-4 w-70 md:w-full lg:w-full">
              <PetDetailData title="Name:" description={profile.name} />
              <PetDetailData title="Category:" description={profile.category} />
              <PetDetailData title="Weight:" description={profile.weight} />
              <PetDetailData title="Breed:" description={profile.breed} />
              <PetDetailData title="Size:" description={profile.size} />
              <PetDetailData title="Gender:" description={profile.gender} />
              <PetDetailData title="Age:" description={profile.age} />
              <PetDetailData
                title="Adopted:"
                description={profile.adopted ? 'adopted' : 'no'}
              />
              <PetDetailData title="Shelter:" description="Actitud Animal" />
            </div>
            <div className="flex-col">
              <h1 className="mt-6 text-md md:text-md lg:text-xl font-semibold text-primary-950">
                {profile.name}
              </h1>
              <p className="text-base font-semibold leading-6 text-gray-900 w-full">
                Semper vel adipiscing laoreet iaculis sed at. Ac urna nibh
                scelerisque congue velit. Quam eget quisque interdum dictumst
                eleifend venenatis cras feugiat. Nunc diam risus sagittis in
                adipiscing nunc. Pharetra aliquam gravida bibendum orci diam
                nisi sem id. Id commodo volutpat platea nisi, nec venenatis
                pulvinar neque, ac. Odio dolor id potenti aliquam mi in nunc at
                sollicitudin. Magna felis, leo sed nec.
              </p>
              <div className=" mt-2 flex items-center gap-2">
                <IconLocation />
                <p className="mt-1 text-xs font-semibold  leading-6 text-gray-400 w-full">
                  {/* {profile.location.city} */}
                  {petDetailMockup.location.city}
                </p>
              </div>
              <div className="mt-6">
                <SwiperGallery slides={profile.images} />
              </div>
            </div>
            <Vaccines vaccines={petDetailMockup.vaccines} />

            {isLoading && (
              <div className="flex items-center w-full justify-center p-8">
                <BaseLoading large />
              </div>
            )}
          </section>
        )
      })}
    </div>
  )
}

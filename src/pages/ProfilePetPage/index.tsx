import { FC } from 'react'
import { Header } from '../../components/Header'
import { useParams } from 'react-router-dom'
import { useGetPet } from '../../hooks/useGetPet'
import { PetDetail } from '../../constants/types'
import SwiperGallery from '../../components/SwiperGallery'
import { Loader } from '../../components/Loader'
import { ManagePets } from './components/ManagePets'
import { PetDetailData } from './components/PetdDetailData'

const images = [
  'https://cdn.midjourney.com/ccf590e2-9d8c-4666-961c-079a48ab6821/0_0.png',
  'https://cdn.midjourney.com/540dfb77-b296-443f-b170-6a35cf336fd3/0_0_384_N.webp',
  'https://cdn.midjourney.com/6a236d52-4bd9-4e91-b478-3309f37be482/0_2_384_N.webp',
  'https://cdn.midjourney.com/ccf590e2-9d8c-4666-961c-079a48ab6821/0_0.png',
  'https://cdn.midjourney.com/ccf590e2-9d8c-4666-961c-079a48ab6821/0_0.png',
  'https://cdn.midjourney.com/540dfb77-b296-443f-b170-6a35cf336fd3/0_0_384_N.webp',
  'https://cdn.midjourney.com/6a236d52-4bd9-4e91-b478-3309f37be482/0_2_384_N.webp',
  'https://cdn.midjourney.com/ccf590e2-9d8c-4666-961c-079a48ab6821/0_0.png',
]

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
          <section key={profile.id}>
            <div className="flex flex-wrap gap-8 justify-center md:justify-between mt-4">
              <PetDetailData title="Name:" description={profile.name} />
              <PetDetailData title="Age:" description={profile.age} />
              <PetDetailData title="Category:" description={profile.type} />
              <PetDetailData title="Breed:" description={profile.breed} />
              <PetDetailData title="Weight:" description="5Kg" />
              <PetDetailData title="Size:" description="Small" />
            </div>
            <div className="flex-col">
              <div className="flex justify-center mt-4">
                <SwiperGallery slides={images} />
              </div>
              <h1 className="mt-4 text-md md:text-md lg:text-xl font-semibold text-primary-950">
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
              <p className="mt-1 text-sm font-semibold  leading-6 text-gray-400 w-full">
                Mendoza, Godoy Cruz, Av San Martin 3203
              </p>
            </div>
            <h2 className="mt-4 text-md md:text-md lg:text-xl font-semibold text-primary-950">
              Responsible for pets
            </h2>
            <h3 className="text-md md:text-md lg:text-md">
              Responsibles for Care {profile.name}
            </h3>
            <div className="flex flex-wrap gap-y-8 justify-between py-8">
              <ManagePets name={'Jess'} role={'Veterinary'} />
              <ManagePets name={'Mary'} role={'Refugiee'} />
              <ManagePets name={'Neil'} role={'Adopter'} />
              <ManagePets name={'Ari'} role={'Voluntarie'} />
            </div>

            {isLoading && (
              <div className="flex items-center  w-full justify-center p-8">
                <Loader big />
              </div>
            )}
          </section>
        )
      })}
    </div>
  )
}

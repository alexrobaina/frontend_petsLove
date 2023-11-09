import { ContactCard } from '../../../../components/ContactCard'

interface Props {
  pet: {
    Shelter: {
      id: string
      email: string
      image: string
      username: string
      firstName: string
    }
    Adopter: {
      id: string
      email: string
      image: string
      username: string
      firstName: string
    }
  }
  gotToUser: (id: string) => void
}

export const Guardians: React.FC<Props> = ({ pet, gotToUser }) => {
  return (
    <>
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
    </>
  )
}

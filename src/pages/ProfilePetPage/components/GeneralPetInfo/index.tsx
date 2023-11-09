import { DetailCard } from '../DetailCard'

interface Props {
  pet: {
    age: string
    size: string
    breed: string
    weight: string
    gender: string
    qrCode: string
    category: string
    description: string
  }
}

export const GeneralPetInfo: React.FC<Props> = ({ pet }) => {
  return (
    <>
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
              This is the QR code of your pet, you can use it to identify it in
              case it gets lost. You can also use it to register it in the
              shelter. Please download it and keep it safe.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

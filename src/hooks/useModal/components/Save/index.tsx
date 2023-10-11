import { ReactNode, FC } from 'react'

import { BaseButton } from '../../../../components/BaseButton'

export interface Props {
  title?: string
  isOpen: boolean
  children?: ReactNode
  description?: string
  onSubmit: () => void
  closeModal: () => void
}

export const Save: FC<Props> = ({
  title,
  isOpen,
  children,
  onSubmit,
  closeModal,
  description,
}) => {
  const saveDocument = () => {
    onSubmit()
    closeModal()
  }

  return (
    <>
      <div
        onClick={(e) => {
          e.defaultPrevented
          closeModal()
        }}
        className={`${
          isOpen
            ? 'fixed bg-black opacity-40 top-0 left-0 w-screen h-screen  '
            : ''
        }`}
      />
      {isOpen && (
        <div className="fixed transform top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 max-w-[360px] md:min-w-[400px] sm:flex p-2 items-end justify-center text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    {title}
                  </h3>
                  {description && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{description}</p>
                    </div>
                  )}
                  {children && children}
                </div>
              </div>
            </div>
            <div className="gap-2 flex px-4 py-3 sm:flex  sm:px-6 justify-end">
              <BaseButton
                style="secondary"
                onClick={closeModal}
                text="Cancel"
              />
              <BaseButton text="Save" style="primary" onClick={saveDocument} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

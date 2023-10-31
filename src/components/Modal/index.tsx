import { ReactNode } from 'react'

import { BaseButton } from '../BaseButton'
import FadeIn from '../FadeIn'

interface Props {
  type?: string
  title?: string
  isOpen: boolean
  isDisabled?: boolean
  description?: string
  children?: ReactNode
  onSubmit?: () => void
  closeModal: () => void
}

export const Modal: React.FC<Props> = ({
  title,
  type,
  isOpen,
  onSubmit,
  closeModal,
  description,
  children = null,
  isDisabled,
}) => {
  if (type === 'alert') {
    return null
  }

  if (type === 'save') {
    return (
      <>
        {isOpen && (
          <FadeIn>
            <div
              onClick={closeModal}
              className={`fixed bg-black opacity-40 w-screen h-screen transition-opacity duration-1 z-50`}
            />
          </FadeIn>
        )}
        {isOpen && (
          <>
            <div
              onClick={(e) => {
                e.preventDefault()
                closeModal && closeModal()
              }}
              className={`${
                isOpen
                  ? 'fixed bg-black opacity-40 top-0 left-0 w-screen h-screen z-50'
                  : ''
              }`}
            />
            {isOpen && (
              <div className="fixed transform top-1/2 left-1/2 z-50 -translate-y-1/2 -translate-x-1/2 sm:flex p-2 items-end justify-center text-center sm:items-center sm:p-0">
                <div className="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="flex sm:flex sm:items-start">
                      <div className="sm:text-left w-full h-auto">
                        <h3
                          className="text-base font-semibold leading-6 text-gray-900"
                          id="modal-title"
                        >
                          {title}
                        </h3>
                        {description && (
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              {description}
                            </p>
                          </div>
                        )}
                        {children && children}
                      </div>
                    </div>
                  </div>
                  <div className="gap-2 flex px-4 py-3 sm:flex  sm:px-6 justify-end">
                    {closeModal && (
                      <BaseButton
                        text="Cancel"
                        style="secondary"
                        onClick={closeModal}
                      />
                    )}
                    <BaseButton
                      isDisabled={isDisabled}
                      text="Save"
                      style="primary"
                      onClick={onSubmit}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </>
    )
  }

  return null
}

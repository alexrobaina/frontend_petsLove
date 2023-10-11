import { FC } from 'react'

import { BaseButton } from '../../../../components/BaseButton'

export interface Props {
  isOpen: boolean
  onSubmit: () => void
  closeModal: () => void
}

export const Delete: FC<Props> = ({ closeModal, isOpen, onSubmit }) => {
  const deleteDocument = () => {
    onSubmit()
    closeModal()
  }
  return (
    <>
      <div
        onClick={closeModal}
        className={`${
          isOpen
            ? 'fixed bg-black opacity-40 top-0 left-0 w-screen h-screen'
            : ''
        }`}
      />
      {isOpen && (
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Delete document
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete? All data will be
                      permanently removed. This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flexbg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <BaseButton
                text="Delete"
                style="delete"
                onClick={deleteDocument}
              />
              <BaseButton
                style="secondary"
                onClick={closeModal}
                text="Cancel"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

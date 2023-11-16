import { FC } from 'react'
import { MultiValue } from 'react-select'

import { ROLES } from '../../constants/community'
import { BaseButton } from '../common/BaseButton'
import { BaseSelect } from '../common/BaseSelect'
import { ReactModal } from '../common/ReactModal'

interface Props {
  setOpenRoleModal: (value: boolean) => void
  isOpenRoleModal: boolean
  role: string
  updateUserRole: () => void
  setFieldValue: (
    field: string,
    value: string | number | File | null | MultiValue<unknown>,
  ) => void
}
export const UserRoleSelectorModal: FC<Props> = ({
  role,
  setFieldValue,
  updateUserRole,
  isOpenRoleModal,
  setOpenRoleModal,
}) => {
  return (
    <ReactModal
      title="Select your role"
      description="Select your role to continue using the platform"
      isOpen={isOpenRoleModal}
    >
      <div className="flex">
        <div className="mt-8 w-full">
          <BaseSelect
            name="role"
            value={role}
            setFieldValue={setFieldValue}
            options={[
              { value: ROLES.ADOPTER, label: ROLES.ADOPTER },
              { value: ROLES.SHELTER, label: ROLES.SHELTER },
              { value: ROLES.VET, label: ROLES.VET },
            ]}
          />
        </div>
      </div>
      <div className="flex gap-2 mt-5 justify-end">
        <BaseButton
          text="Save"
          style="primary"
          isDisabled={!role}
          onClick={() => {
            updateUserRole()
            setOpenRoleModal(false)
          }}
        />
      </div>
    </ReactModal>
  )
}

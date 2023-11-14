import { FC } from 'react'

import { BaseLoading } from '../../../../components/common/BaseLoading'

export const Loadings: FC = () => (
  <>
    {' '}
    <div className="flex flex-col gap-2 mt-5 flex-wrap">
      <h1>Loadings</h1>
      <div className="flex gap-5">
        <BaseLoading />
        <BaseLoading large />
      </div>
    </div>
  </>
)

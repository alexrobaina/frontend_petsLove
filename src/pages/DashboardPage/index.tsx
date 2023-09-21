import { FC } from 'react'

import { Header } from '../../components/Header'

export const DashboardPage: FC = () => {
  return (
    <header>
      <Header title="Dashboard" canBack />
    </header>
  )
}

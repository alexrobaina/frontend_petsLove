import { observer } from 'mobx-react'
import { FC, useState } from 'react'
import { Outlet } from 'react-router-dom'

import Layout from '../Layout/Layout'

import { SideBar } from './components/SideBar'

export const Navigation: FC = observer(() => {
  const [menuIsCollapsed, setMenuIsCollapsed] = useState(true)

  return (
    <SideBar
      menuIsCollapsed={menuIsCollapsed}
      setMenuIsCollapsed={setMenuIsCollapsed}
    >
      <Layout>
        <Outlet />
      </Layout>
    </SideBar>
  )
})

export default Navigation

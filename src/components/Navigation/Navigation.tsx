import { FC, useState } from 'react'
import Layout from '../Layout/Layout'
import { SideBar } from './components/SideBar'
import { Outlet } from 'react-router-dom'
import { observer } from 'mobx-react'

const Navigation: FC = observer(() => {
  const [menuIsCollapsed, setMenuIsCollapsed] = useState(true)

  return (
    <SideBar menuIsCollapsed={menuIsCollapsed} setMenuIsCollapsed={setMenuIsCollapsed}>
      <Layout>
        <Outlet />
      </Layout>
    </SideBar>
  )
})

export default Navigation

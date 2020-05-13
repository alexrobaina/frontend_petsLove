import React from 'react'
import { observer } from 'mobx-react'
import LayoutTrantitions from 'components/commons/LayoutTrantitions'
import FormLogin from 'components/FormLogin'
import LayoutContainer from 'components/commons/LayoutContainer'
import styles from './login.scss'

const Login = () => {
  return (
    <LayoutContainer>
      <LayoutTrantitions>
        <div className={styles.containerLogin}>
          <FormLogin />
        </div>
      </LayoutTrantitions>
    </LayoutContainer>
  )
}

export default observer(Login)

import React from 'react'
import { observer } from 'mobx-react'
import ImageInformationLeft from 'components/commons/ImageInformationLeft'
import LayoutTrantitions from 'components/commons/LayoutTrantitions'
import FormLogin from 'components/FormLogin'
import catImage from './photo-1526336024174-e58f5cdd8e13.jpeg'
import styles from './login.scss'

const Login = () => {
  return (
    <LayoutTrantitions>
      <div className={styles.containerLogin}>
        <ImageInformationLeft image={catImage} />
        <FormLogin />
      </div>
    </LayoutTrantitions>
  )
}

export default observer(Login)

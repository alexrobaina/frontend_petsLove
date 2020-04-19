import React from 'react'
import { observer, useLocalStore } from 'mobx-react'
import RegisterStore from 'stores/RegisterStore'
import ImageInformationLeft from 'components/commons/ImageInformationLeft'
import LayoutTrantitions from 'components/commons/LayoutTrantitions'
import FormRegister from 'components/FormRegister'
import catImage from './imageCat.jpg'
import styles from './register.scss'

const Register = () => {
  const registerStore = useLocalStore(() => new RegisterStore())

  return (
    <LayoutTrantitions>
      <div className={styles.containerRegister}>
        <ImageInformationLeft image={catImage} />
        <FormRegister registerStore={registerStore} />
      </div>
    </LayoutTrantitions>
  )
}

export default observer(Register)

import React from 'react'
import { observer, useLocalStore } from 'mobx-react'
import Navbar from 'components/commons/Navbar'
import ImageInformationLeft from 'components/commons/ImageInformationLeft'
import RegisterStore from 'stores/RegisterStore'
import FormRegister from 'components/FormRegister'
import catImage from './imageCat.jpg'
import styles from './register.scss'

const Register = () => {
  const registerStore = useLocalStore(() => new RegisterStore())

  return (
    <Navbar>
      <div className={styles.containerRegister}>
        <ImageInformationLeft image={catImage} />
        <FormRegister registerStore={registerStore} />
      </div>
    </Navbar>
  )
}

export default observer(Register)

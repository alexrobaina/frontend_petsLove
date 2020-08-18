import React from 'react'
import { useTranslation } from 'react-i18next'
import SocialMediaButtons from 'components/commons/SocialMediaButtons'
import Button from 'components/commons/Button'
import styles from './footer.scss'

const Footer = () => {
  const { t } = useTranslation()
  return (
    <>
      <div className={styles.containerFooter}>
        <div className={styles.containerRow}>
          <div className={styles.row}>
            <div className={styles.logo}>Pets Love</div>
            Este es un texto de prueba para animarte a que te registers
            <div className={styles.containerButtonSignUp}>
              <Button bigButton text={t('common:signUp')} />
            </div>
          </div>
          <div className={styles.cafecito}>
            <a href="https://cafecito.app/petslove" rel="noopener noreferrer" target="_blank">
              <img
                srcSet="https://cdn.cafecito.app/imgs/buttons/button_6.png 1x, https://cdn.cafecito.app/imgs/buttons/button_6_2x.png 2x, https://cdn.cafecito.app/imgs/buttons/button_6_3.75x.png 3.75x"
                src="https://cdn.cafecito.app/imgs/buttons/button_6.png"
                alt="Invitame un café en cafecito.app"
              />
            </a>
          </div>
        </div>
        <div className={styles.socialMedia}>
          <SocialMediaButtons title={t('Nuestras redes')} />
        </div>
      </div>
    </>
  )
}
export default Footer

import React, { useCallback, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import { PROFILE_USER, REGISTER } from 'routing/routes'
import SocialMediaButtons from 'components/commons/SocialMediaButtons'
import Button from 'components/commons/Button'
import styles from './footer.scss'
import UserContext from 'Context/UserContext'

const Footer = () => {
  const history = useHistory()
  const { t } = useTranslation('landingPage')
  const { authStore } = useContext(UserContext);

  const handleGoToProfile = useCallback(() => history.push(`${PROFILE_USER}/${authStore.user._id}`), [])

  const handleGoToRegister = useCallback(() => {
    history.push(REGISTER)
  }, [])
  return (
    <>
      <div className={styles.containerFooter}>
        <div className={styles.containerRow}>
          <div className={styles.row}>
            <div className={styles.logo}>Pets Love</div>
            <div className={styles.text}>{t('helpToPetMessage')}</div>
            {authStore.isLogin ?
              <div className={styles.containerButtonSignUp}>
                <Button handleClick={handleGoToProfile} bigButton text={t('navbar:myProfile')} />
              </div>
              :
              <div className={styles.containerButtonSignUp}>
                <Button handleClick={handleGoToRegister} bigButton text={t('common:signUp')} />
              </div>}
          </div>
          <div className={styles.cafecito}>
            <a href="https://cafecito.app/petslove" target="_blank" rel="noopener noreferrer">
              <img
                srcSet="https://cdn.cafecito.app/imgs/buttons/button_6.png 1x, https://cdn.cafecito.app/imgs/buttons/button_6_2x.png 2x, https://cdn.cafecito.app/imgs/buttons/button_6_3.75x.png 3.75x"
                src="https://cdn.cafecito.app/imgs/buttons/button_6.png"
                alt="Invitame un café en cafecito.app"
              />
            </a>
          </div>
        </div>
        <div className={styles.socialMedia}>
          <SocialMediaButtons />
        </div>
      </div>
    </>
  )
}
export default Footer

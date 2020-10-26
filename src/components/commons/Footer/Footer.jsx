import React, { useCallback, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import { PROFILE_USER, REGISTER } from 'routing/routes'
import SocialMediaButtons from 'components/commons/SocialMediaButtons'
import Button from 'components/commons/Button'
import UserContext from 'Context/UserContext'
import styles from './footer.scss'

const Footer = () => {
  const history = useHistory()
  const { t } = useTranslation('landingPage')
  const { authStore } = useContext(UserContext);

  const goTo = useCallback(() => {
    if (authStore.isLogin) return history.push(`${PROFILE_USER}/${authStore.user._id}`)
    return history.push(REGISTER)
  }, [authStore.isLogin])

  const formatText = useCallback(() => {
    if (authStore.isLogin) return t('navbar:myProfile')
    return t('common:signUp')
  }, [authStore.isLogin])

  return (
    <>
      <div className={styles.containerFooter}>
        <div className={styles.containerRow}>
          <div className={styles.row}>
            <div className={styles.logo}>Pets Love</div>
            <div className={styles.text}>{t('helpToPetMessage')}</div>
            <div className={styles.containerButtonSignUp}>
              <Button handleClick={goTo} bigButton text={formatText()} />
            </div>
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

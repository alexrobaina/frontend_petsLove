import React from 'react'
import MaterialIcon from 'material-icons-react'
import anime from 'animejs/lib/anime.es'
import c from 'classnames'
import styles from './initialLogo.module.scss'

class InitialLogo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayNone: false,
    }
  }

  componentDidMount() {
    anime({
      targets: '.animationLogo',
      opacity: 1,
      easing: 'linear',
      duration: 1500,
    }).finished.then(() => {
      anime({
        targets: '.animationLogo',
        opacity: 0,
        delay: 1000,
        easing: 'linear',
        duration: 1500,
      })
    })
    anime({
      targets: '.catAnimation',
      translateX: -1500,
      autoplay: true,
      duration: 2000,
      easing: 'easeInOutSine',
    })
    setTimeout(() => {
      this.setState({
        displayNone: true,
      })
    }, 3500)

    anime({
      targets: '.catAnimation',
      translateX: 50
    })
  }

  render() {
    const { displayNone } = this.state

    return (
      <div className={c(displayNone ? styles.displayNone : '')}>
        <div className={c(styles.cat, 'catAnimation')}></div>
        <div className={c(styles.container, 'animationLogo')}>
          <div className={styles.firstPat1}>
            <div className={styles.pat7}>
              <MaterialIcon color='#ECEFF5' icon="pets" size={50} />
            </div>
            <div className={styles.pat8}>
              <MaterialIcon color='#ECEFF5' icon="pets" size={30} />
            </div>
            <div className={styles.pat9}>
              <MaterialIcon color='#ECEFF5' icon="pets" size={50} />
            </div>
            <div className={styles.pat10}>
              <MaterialIcon color='#ECEFF5' icon="pets" size={10} />
            </div>
          </div>
          <div className={styles.firstPat1}>
            <div className={styles.pat1}>
              <MaterialIcon color='#ECEFF5' icon="pets" size={50} />
            </div>
            <div className={styles.pat2}>
              <MaterialIcon color='#ECEFF5' icon="pets" size={30} />
            </div>
            <div className={styles.pat3}>
              <MaterialIcon color='#ECEFF5' icon="pets" size={50} />
            </div>
            <div>
              <MaterialIcon color='#ECEFF5' icon="pets" size={10} />
            </div>
          </div>
          <div className={styles.firstPat2}>
            <div className={styles.pat1}>
              <MaterialIcon color='#ECEFF5' icon="pets" size={50} />
            </div>
            <div>
              <MaterialIcon color='#ECEFF5' icon="pets" size={30} />
            </div>
            <div>
              <MaterialIcon color='#ECEFF5' icon="pets" size={50} />
            </div>
            <div className={styles.pat7}>
              <MaterialIcon color='#ECEFF5' icon="pets" size={10} />
            </div>
          </div>
          <div className={styles.firstPat3}>
            <div className={styles.pat8}>
              <MaterialIcon color='#ECEFF5' icon="pets" size={50} />
            </div>
            <div className={styles.pat9}>
              <MaterialIcon color='#ECEFF5' icon="pets" size={30} />
            </div>
            <div className={styles.pat10}>
              <MaterialIcon color='#ECEFF5' icon="pets" size={50} />
            </div>
            <div>
              <MaterialIcon color='#ECEFF5' icon="pets" size={10} />
            </div>
          </div>
          <div className={styles.logoTypography}>
            Pets Love
          </div>
        </div>
      </div>
    )
  }
}

export default InitialLogo

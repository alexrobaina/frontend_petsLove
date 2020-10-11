import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Animated } from 'react-animated-css'
import c from 'classnames'
import styles from './loading.scss'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '150px',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}))

const Loading = ({ small, loadingRing }) => {
  const classes = useStyles()

  return (
    <Animated animationIn="fadeIn" animationOut="fadeInUp" animationInDuration={100}>
      {loadingRing ? (
        <div className={classes.root}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <div className={c(styles.heart, small && styles.small)}>
          <div />
        </div>
      )}
    </Animated>
  )
}

Loading.propTypes = {
  small: PropTypes.bool,
}

Loading.defaultProps = {
  small: false,
}

export default Loading

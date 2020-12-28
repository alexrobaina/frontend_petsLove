import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import c from 'classnames';
import styles from './loading.module.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '150px',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

interface Props {
  small: boolean;
  loadingRing: boolean;
}

const Loading = ({ small = false, loadingRing = false }) => {
  const classes = useStyles();

  return (
    <>
      {loadingRing ? (
        <div className={classes.root}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <div className={c(styles.heart, small && styles.small)}>
          <div />
        </div>
      )}
    </>
  );
};

export default Loading;

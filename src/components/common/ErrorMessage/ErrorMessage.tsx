import c from 'classnames';
import styles from './errorMessage.module.scss';

const ErrorMessage = ({ text, typeMessage }) => {
  return (
    <div
      className={c(
        styles.containerError,
        typeMessage === 'warning' && styles.warning,
        typeMessage === 'error' && styles.error,
      )}
    >
      <div className={styles.text}>{text}</div>
    </div>
  );
};

export default ErrorMessage;

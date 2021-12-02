import { useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import c from 'classnames';
import styles from './alertToast.module.scss';

const AlertToast = ({ toggleToast, handleToggleToast, text, warning = false }) => {
  useEffect(() => {
    if (toggleToast) {
      setTimeout(() => {
        handleToggleToast(false);
      }, 4000);
    }
  }, [toggleToast]);

  return (
    <div
      onClick={() => handleToggleToast(false)}
      className={c(
        styles.container,
        toggleToast && styles.toast,
        warning && styles.warning,
      )}
    >
      <div className={styles.containerIconClose}>
        <IoMdClose size={20} />
      </div>
      <div className={styles.text}>{text}</div>
    </div>
  );
};

export default AlertToast;

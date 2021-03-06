import { FC, ReactChild, useCallback } from 'react';
import c from 'classnames';
import styles from './button.module.scss';

interface Props {
  text?: string;
  circle?: boolean;
  tooltips?: string;
  icon?: ReactChild;
  onClick?: Function;
  secundary?: boolean;
  transparent?: boolean;
}

const Button: FC<Props> = ({
  icon,
  text,
  circle,
  onClick,
  tooltips,
  secundary,
  transparent,
}) => {
  const click = useCallback(() => {
    onClick();
  }, []);

  return (
    <>
      {circle ? (
        <div
          onClick={click}
          className={c(
            styles.button,
            circle && styles.circle,
            secundary && styles.secundary,
            transparent && styles.transparent,
          )}
        >
          {icon}
        </div>
      ) : (
        <div
          onClick={click}
          className={c(
            styles.button,
            secundary && styles.secundary,
            transparent && styles.transparent,
          )}
        >
          <div className={styles.content}>
            {icon && <div className={styles.icon}>{icon}</div>}
            {text && <div className={styles.text}>{text}</div>}
          </div>
        </div>
      )}
    </>
  );
};

Button.defaultProps = {
  icon: null,
  text: null,
  circle: false,
  secundary: false,
  transparent: null,
  onClick: () => {},
};

export default Button;

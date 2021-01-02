import { FC, ReactChild } from 'react';
import Link from 'next/link';
import c from 'classnames';
import styles from './linkButton.module.scss';

interface Props {
  url: string;
  text?: string;
  circle?: boolean;
  icon?: ReactChild;
  onClick?: () => void;
  secundary?: boolean;
  transparent?: boolean;
}

const LinkButton: FC<Props> = ({
  icon,
  text,
  circle,
  transparent,
  secundary,
  url,
  onClick,
}) => {
  return (
    <>
      {circle ? (
        <Link href={url}>
          <div
            role="button"
            onClick={onClick}
            className={c(
              styles.button,
              circle && styles.circle,
              secundary && styles.secundary,
              transparent && styles.transparent,
            )}
          >
            {icon}
          </div>
        </Link>
      ) : (
        <Link href={url}>
          <div
            role="button"
            onClick={onClick}
            className={c(
              styles.button,
              secundary && styles.secundary,
              transparent && styles.transparent,
            )}
          >
            <div className={styles.content}>
              {icon && <div className={c(styles.icon)}>{icon}</div>}
              {text && <div className={styles.text}>{text}</div>}
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

LinkButton.defaultProps = {
  icon: null,
  text: null,
  circle: false,
  secundary: false,
  transparent: null,
};

export default LinkButton;

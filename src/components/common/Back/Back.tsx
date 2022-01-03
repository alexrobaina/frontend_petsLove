import { ReactElement, FC } from 'react';
import Link from 'next/link';
import styles from './back.module.scss';

interface Props {
  text: string;
  route: string;
  icon: ReactElement;
}

const Back: FC<Props> = ({ text, icon, route }) => {
  return (
    <Link href={route}>
      <div className={styles.goTo}>
        {icon}
        <div className={styles.buttonSearch}>{text}</div>
      </div>
    </Link>
  );
};

export default Back;

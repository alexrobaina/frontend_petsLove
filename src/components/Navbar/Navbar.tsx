import { BiHomeHeart } from 'react-icons/bi';
import { AiFillHeart } from 'react-icons/ai';
import { FaLanguage } from 'react-icons/fa';
import Button from 'components/common/Button';
import styles from './navbar.module.scss';

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.col}>
        <div className={styles.buttonGrup}>
          <div className={styles.containerButton}>
            <Button
              circle
              secundary
              transparent
              text="Adoptar mascota"
              icon={<BiHomeHeart size={25} />}
            />
          </div>
          <div className={styles.containerButton}>
            <Button secundary circle icon={<AiFillHeart size={25} />} />
          </div>
        </div>
        <div className={styles.buttonGrup}>
          <div className={styles.containerButton}>
            <Button secundary circle transparent icon={<FaLanguage size={35} />} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import { useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { RiUserHeartFill } from 'react-icons/ri';
import { ImWhatsapp } from 'react-icons/im';
import c from 'classnames';
import Button from 'components/common/Button';
import styles from './actionsProfile.module.scss';

interface Props {
  handleGoToProfile?: () => void;
  handleWhatsapp?: () => void;
}

const ActionsProfile = ({ handleGoToProfile = null, handleWhatsapp = null }) => {
  return (
    <div className={styles.containerActions}>
      {handleGoToProfile && (
        <div className={styles.action}>
          <Button
            circle
            onClick={handleGoToProfile}
            tooltips={'Shelter profile'}
            icon={<RiUserHeartFill size={20} />}
          />
        </div>
      )}
      {handleWhatsapp && (
        <div className={styles.action}>
          <Button circle onClick={handleWhatsapp} icon={<ImWhatsapp size={20} />} />
        </div>
      )}
    </div>
  );
};

export default ActionsProfile;

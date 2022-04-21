import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import c from 'classnames';
import styles from './AnimalNavigator.module.scss';

const CAT = 'cat';
const DOG = 'dog';
const EXOTIC = 'exotic';

interface Props {
  selected: string;
  handleFilterPets(typePet: string): any;
}

const AnimalNavigator: FC<Props> = ({ handleFilterPets, selected }) => {
  const [cats, setCats] = useState(false);
  const [dogs, setDogs] = useState(false);
  const [exotics, setExotics] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (selected === CAT) {
      setCats(true);
      setDogs(false);
      setExotics(false);
    }
    if (selected === DOG) {
      setDogs(true);
      setExotics(false);
      setCats(false);
    }
    if (selected === EXOTIC) {
      setExotics(true);
      setDogs(false);
      setCats(false);
    }
  }, [selected]);

  return (
    <div className={styles.containerNavegator}>
      <div
        onClick={() => handleFilterPets(CAT)}
        className={c(styles.buttonNav, cats && styles.selected)}
      >
        {t('common:cats')}
      </div>
      <div
        onClick={() => handleFilterPets(DOG)}
        className={c(styles.buttonNav, dogs && styles.selected)}
      >
        {t('common:dogs')}
      </div>
      <div
        onClick={() => handleFilterPets(EXOTIC)}
        className={c(styles.buttonNav, exotics && styles.selected)}
      >
        {t('common:exotics')}
      </div>
    </div>
  );
};

export default AnimalNavigator;

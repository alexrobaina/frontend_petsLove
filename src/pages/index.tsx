import BaseButton from 'components/common/BaseButton';
import BaseTitle from 'components/common/BaseTitle';
import Pagination from 'components/common/Pagination';
import SEOData from 'components/common/SEOData';
import PetsList from 'components/PetsList';
import Search from 'components/Search';
import { META_TAGS } from 'constants/metadataTags';
import { usePetsFiltered } from 'hooks/queries/pet/usePetsFiltered';
import type { NextPage } from 'next';
import { useState } from 'react';

import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  const [page, setPage] = useState(1);
  const [sex, setSex] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [category, setCategory] = useState('');
  const [address, setTextAddress] = useState('');
  const { data: pets, isLoading: isLoadingPet } = usePetsFiltered({
    sex,
    city,
    page,
    country,
    category,
    adopted: false,
  });

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  const clearFilters = () => {
    setSex('');
    setCity('');
    setCountry('');
    setCategory('');
    setTextAddress('');
  };

  return (
    <div className={styles.container}>
      <SEOData
        myApp="Pets Love"
        title={META_TAGS.title}
        baseUrl="https://pets-love.app"
        description={META_TAGS.description}
        image="/assets/images/landingPage/friendAndDog.jpg"
      />
      <div className={styles.header}>
        <BaseTitle title="Buscar mascotas" />
        <BaseButton text="Limpiar filtros" onClick={clearFilters} />
      </div>
      <main className={styles.main}>
        <Search
          sex={sex}
          setSex={setSex}
          setCity={setCity}
          address={address}
          category={category}
          setCountry={setCountry}
          setCategory={setCategory}
          setTextAddress={setTextAddress}
        />
        <div>
          <PetsList pets={pets?.pets} isLoading={isLoadingPet} />
          <Pagination
            page={page}
            limitOfItems={10}
            totalItems={pets?.total || 0}
            handleChangePage={handleChangePage}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;

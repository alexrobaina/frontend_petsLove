import { useContext, useEffect, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import Seo from 'utils/Seo';
import Title from 'components/common/Title';
import LandingPage from 'components/LandingPage';
import Layout from 'components/common/Layout';
import Search from 'components/Search';
import PaginationList from 'components/common/PaginationList';
import { LIMIT_SEARCH } from 'services/config';
import Loading from 'components/common/Loading';
import PetsList from 'components/PetsList';
import ScrollUp from 'components/common/ScrollUp';
import PetContext from 'Context/PetContext';
import styles from 'styles/index.module.scss';

const metaTags = {
  title: 'Animate a adoptar y busca a tu nuevo mejor amigo.',
  description:
    'Es una aplicación creada con la intención de ayudar a los refugios, veterinarios, voluntarios y todo aquel que quiera adoptar una mascota. Al momento de adoptar una mascota el proteccionista y el adoptante podrán hacer de forma más precisa el seguimiento de los principales cuidados de la mascota. Construimos un flujo de información más exacta con los datos veterinarios de la salud de nuestro amigo y fotografías que nos permitirán ver un historial que busca garantizar la seguridad y salud del mismo.',
};

const Home = () => {
  const rootStore = useContext(PetContext);
  const { searchPetStore } = rootStore;
  const [page, setPage] = useState(1);

  const { t } = useTranslation('home');

  const handleChangePage = useCallback((e, newPage) => {
    searchPetStore.searchPets(LIMIT_SEARCH, newPage);
    setPage(newPage);
  }, []);

  useEffect(() => {
    searchPetStore.resetPets();
  }, []);

  return (
    <Layout>
      <Seo
        myApp="Pets Love"
        title={metaTags.title}
        description={metaTags.description}
        baseUrl="https://pets-love.app"
        image="/assets/images/landingPage/friendAndDog.jpg"
      />
      <main className={styles.main}>
        <Title text={t('searchPet')} />
        <Search searchPetStore={searchPetStore} />
        {searchPetStore.isLoading && <Loading />}
        {searchPetStore.pets.length === 0 && searchPetStore.searchingPet === false ? (
          <>
            <LandingPage />
            <ScrollUp />
          </>
        ) : (
          <>
            <PetsList searchPetStore={searchPetStore} />
            <PaginationList
              page={page}
              limit={LIMIT_SEARCH}
              handleChange={handleChangePage}
              total={searchPetStore.totalPets}
            />
          </>
        )}
      </main>
    </Layout>
  );
};

export default observer(Home);

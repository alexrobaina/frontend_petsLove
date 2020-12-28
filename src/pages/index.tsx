import { useEffect, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { observer, useLocalObservable } from 'mobx-react-lite';
import Seo from 'utils/Seo';
import Title from 'components/common/Title';
import LandingPage from 'components/LandingPage';
import Layout from 'components/common/Layout';
import Search from 'components/Search';
import PaginationList from 'components/common/PaginationList';
import SearchPetStore from 'stores/SearchPetStore';
import { LIMIT_SEARCH } from 'services/config';
import Loading from 'components/common/Loading';
import PetsList from 'components/PetsList';
import ScrollUp from 'components/common/ScrollUp';
import styles from 'styles/index.module.scss';

const Home = () => {
  const [page, setPage] = useState(1);
  const searchPetStore = useLocalObservable(() => new SearchPetStore());
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
        title={t('searchPet')}
        description={t('description')}
        baseUrl="https://pets-love.app"
      />
      <main className={styles.main}>
        <Title text={t('searchPet')} />
        <Search searchPetStore={searchPetStore} />
        {searchPetStore.isLoading && <Loading />}
        {searchPetStore.pets.length === 0 ? (
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

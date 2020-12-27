import { useCallback, useState } from 'react';
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
import styles from 'styles/index.module.scss';

const Home = () => {
  const [page, setPage] = useState(1);
  const searchPetStore = useLocalObservable(() => new SearchPetStore());
  const { t } = useTranslation('home');

  const handleChangePage = useCallback((e, newPage) => {
    searchPetStore.searchPets(LIMIT_SEARCH, newPage);
    setPage(newPage);
  }, []);

  return (
    <Layout>
      <Seo
        myApp="Pets Love"
        title={t('title')}
        description={t('description')}
        baseUrl="https://pets-love.app"
      />
      <main className={styles.main}>
        <Title text={t('title')} />
        <Search searchPetStore={searchPetStore} />
        {searchPetStore.isLoading && <Loading />}
        {searchPetStore.pets.length === 0 ? (
          <LandingPage />
        ) : (
          <div>
            <PetsList searchPetStore={searchPetStore} />
            <PaginationList
              page={page}
              limit={LIMIT_SEARCH}
              handleChange={handleChangePage}
              total={searchPetStore.totalPets}
            />
          </div>
        )}
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer> */}
    </Layout>
  );
};

export default observer(Home);

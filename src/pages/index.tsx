import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { observer, useLocalObservable } from 'mobx-react-lite';
import Seo from 'utils/Seo';
import Title from 'components/common/Title';
import Layout from 'components/common/Layout';
import Search from 'components/Search';
import PaginationList from 'components/common/PaginationList';
import SearchPetStore from 'stores/SearchPetStore';
import { LIMIT_SEARCH } from 'services/config';
import ErrorMessage from 'components/common/ErrorMessage';
import PetsList from 'components/PetsList/PetsList';
import styles from 'styles/index.module.scss';

const Home = () => {
  const [page, setPage] = useState(1);
  const searchPetStore = useLocalObservable(() => new SearchPetStore());
  const { t } = useTranslation('home');

  const handleChangePage = useCallback((e, newPage) => {
    console.log(e);
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
        {searchPetStore.pets.length === 0 ? (
          <ErrorMessage text="No hay mascotas" typeMessage="warning" />
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

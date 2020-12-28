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
import Loading from 'components/common/Loading';
import PetsList from 'components/PetsList';
import styles from 'styles/index.module.scss';
import ErrorMessage from 'components/common/ErrorMessage';

const Home = () => {
  const [page, setPage] = useState(1);
  const searchPetStore = useLocalObservable(() => new SearchPetStore());
  const { t } = useTranslation('searchPets');

  const handleChangePage = useCallback((e, newPage) => {
    searchPetStore.searchPets(LIMIT_SEARCH, newPage);
    setPage(newPage);
  }, []);

  return (
    <Layout>
      <Seo
        myApp="Pets Love"
        title={t('searchTitle')}
        description={t('description')}
        baseUrl="https://pets-love.app"
      />
      <main className={styles.main}>
        <Title text={t('searchTitle')} />
        <Search searchPetStore={searchPetStore} />
        {searchPetStore.isLoading && <Loading />}
        {searchPetStore.pets.length === 0 ? (
          <ErrorMessage typeMessage="warning" text="No hay mascotas con estos filtos" />
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
    </Layout>
  );
};

export default observer(Home);

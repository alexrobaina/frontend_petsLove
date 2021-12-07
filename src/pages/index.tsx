import { useContext, useCallback } from 'react';
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
import META_TAGS from './profile-shelter/constants';

const Home = () => {
  const rootStore = useContext(PetContext);
  const { searchPetStore } = rootStore;
  const { t } = useTranslation('home');

  const handleChangePage = useCallback((e, newPage) => {
    searchPetStore.searchPets(LIMIT_SEARCH, newPage);
    searchPetStore.setPage(newPage);
  }, []);

  return (
    <Layout>
      <Seo
        myApp="Pets Love"
        title={META_TAGS.title}
        baseUrl="https://pets-love.app"
        description={META_TAGS.description}
        image="/assets/images/landingPage/friendAndDog.jpg"
      />
      <main className={styles.main}>
        <Title text={t('searchPet')} />
        <Search searchPetStore={searchPetStore} />
        {searchPetStore.isLoading && <Loading />}
        {searchPetStore.pets?.length === 0 && searchPetStore.searchingPet === false ? (
          <>
            <LandingPage />
            <ScrollUp />
          </>
        ) : (
          <>
            <PetsList store={searchPetStore} />
            {searchPetStore.pets?.length > 0 && (
              <PaginationList
                limit={LIMIT_SEARCH}
                page={searchPetStore.page}
                handleChange={handleChangePage}
                total={searchPetStore.totalPets}
              />
            )}
          </>
        )}
      </main>
    </Layout>
  );
};

export default observer(Home);

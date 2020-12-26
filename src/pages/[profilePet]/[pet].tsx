import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import Seo from 'utils/Seo';
import Navbar from 'components/Navbar';
import Title from 'components/common/Title';
import Layout from 'components/common/Layout';
// import SearchPetStore from 'stores/SearchPetStore';

const Pet = () => {
  const router = useRouter();
  // const searchPetStore = useLocalObservable(() => new SearchPetStore());
  const { t } = useTranslation('home');

  return (
    <Layout>
      <Seo
        myApp="Pets Love"
        title={t('title')}
        description={t('description')}
        baseUrl="https://pets-love.app"
      />
      {router.query.pet}
    </Layout>
  );
};

export default observer(Pet);

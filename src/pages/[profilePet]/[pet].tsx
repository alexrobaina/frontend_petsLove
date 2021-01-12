import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import Seo from 'utils/Seo';
import Layout from 'components/common/Layout';

const Pet = () => {
  const router = useRouter();
  const { t } = useTranslation('profilePets');

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

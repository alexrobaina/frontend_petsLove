import { useUser } from 'hooks/queries/user/useUser';
import BaseLoading from 'components/common/BaseLoading';

import styles from './Profile.module.scss';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaTwitch, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import BaseText from 'components/common/BaseText';
import GoogleMapsLocation from 'components/common/GoogleMapsLocation';

const Profile = () => {
  const { data: user, isLoading } = useUser();

  const getSocialMediaValue = (socialMedia: Array<any>, network: string): string => {
    let link = '';
    socialMedia.forEach((socialLink: string) => {
      if (network === 'instagram') {
        socialLink.includes('instagram') && (link = socialLink);
      }
      if (network === 'twitter') {
        socialLink.includes('twitter') && (link = socialLink);
      }
      if (network === 'github') {
        socialLink.includes('github') && (link = socialLink);
      }
      if (network === 'facebook') {
        socialLink.includes('facebook') && (link = socialLink);
      }
    });
    return link;
  };

  if (isLoading) {
    return <BaseLoading center />;
  }

  return (
    <div>
      <div className={styles.containerCover}>
        <div className={styles.cover} />
      </div>
      <div className={styles.containerAvatar}>
        <Image width={150} height={150} src={user.image} className={styles.avatar} />
      </div>
      <div className={styles.networkContainer}>
        {user.socialNetworks?.instagram && (
          <a href={user.socialNetworks.instagram}>
            <FaInstagram size={30} />
          </a>
        )}
        {user.socialNetworks?.twitter && (
          <a href={user.socialNetworks?.twitter}>
            <FaTwitter size={30} />
          </a>
        )}
        {user.socialNetworks?.facebook && (
          <a href={user.socialNetworks?.facebook}>
            <FaFacebook size={30} />
          </a>
        )}

        {user.phone && (
          <a href={user.phone}>
            <FaWhatsapp size={30} />
          </a>
        )}
      </div>
      <div className={styles.name}>
        <BaseText size={30} medium text="Refugio" />
        <BaseText size={30} medium text={user.name} />
      </div>
      <div className={styles.description}>
        <BaseText text="Descripción" />
        <BaseText text={user.description} />
      </div>
      {user.location && (
        <div>
          <BaseText
            marginTop={20}
            marginBottom={10}
            size={20}
            text={user.location?.textAddress}
          />
          <GoogleMapsLocation
            position={{
              lat: user.location?.lat,
              lng: user.location?.lng,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;

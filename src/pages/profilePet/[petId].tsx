import { useUserSession } from 'hooks/queries/user/useUserSession';
import type { NextPage } from 'next';
import ProfilePet from 'view/ProfilePet';

const ProfilePetPage: NextPage = () => {
  useUserSession('/');

  return <ProfilePet />;
};

export default ProfilePetPage;

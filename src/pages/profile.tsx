import { useUserSession } from "hooks/queries/user/useUserSession";
import type { NextPage } from "next";
import Profile from "view/Profile";

const ProfilePage: NextPage = () => {
  useUserSession("/");

  return <Profile />;
};

export default ProfilePage;

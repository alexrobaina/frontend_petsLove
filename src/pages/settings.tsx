import { useUserSession } from "hooks/queries/user/useUserSession";
import type { NextPage } from "next";
import Settings from "view/Settings";

const SettingsPage: NextPage = () => {
  useUserSession("/");

  return <Settings />;
};

export default SettingsPage;

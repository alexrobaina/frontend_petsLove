import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { AiOutlineProfile } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import c from "classnames";
import { useRouter } from "next/router";
import ToggleMenu from "components/common/ToggleMenu";
import { signOut, useSession } from "next-auth/react";
import { HiOutlineLogout } from "react-icons/hi";
import ThemeChange from "../ThemeChange";
import Image from "next/image";
import { MdOutlineNotifications } from "react-icons/md";
import BaseTitle from "components/common/BaseTitle";

import styles from "./Navbar.module.scss";

const Navbar: FC = () => {
  const { data: session }: any = useSession();
  const [isOpenMenu, setOpenMenu] = useState(false);
  const router = useRouter();
  const activeLink = (href: string) => router.asPath === href;

  const closeToggleMenu = () => {
    setOpenMenu(false);
  };

  useEffect(() => {
    document.body.addEventListener("click", closeToggleMenu, true);
  }, []);

  return (
    <div className={styles.header}>
      <div className={styles.navigationContainer}>
        <BaseTitle size={32} title="Pets love" />
      </div>
      <div className={styles.containerActions}>
        {session?.user && (
          <div className={styles.iconButton}>
            <MdOutlineNotifications size={25} />
          </div>
        )}
        <div>
          {session?.user?.image && (
            <Image
              width={40}
              height={40}
              loading="lazy"
              objectFit="contain"
              className={styles.avatar}
              src={`${session?.user?.image}`}
              onClick={() => setOpenMenu(!isOpenMenu)}
            />
          )}
          {!session?.user && (
            <Link href="/login">
              <div
                className={c(
                  activeLink("/login") && styles.activeLink,
                  styles.linkNavigation
                )}
              >
                Login
              </div>
            </Link>
          )}
          <div style={{ position: "absolute", top: 0, right: 60 }}>
            <ToggleMenu isOpen={isOpenMenu}>
              <div className={styles.containarMenu}>
                <Link href="/profile">
                  <div className={styles.buttonMenu}>
                    <AiOutlineProfile size={30} />
                    Profile
                  </div>
                </Link>
                <Link href="/settings">
                  <div className={styles.buttonMenu}>
                    <IoMdSettings size={25} />
                    Settings
                  </div>
                </Link>
                <Link href="/">
                  <div onClick={() => signOut()} className={styles.buttonMenu}>
                    <HiOutlineLogout size={25} />
                    Logout
                  </div>
                </Link>
              </div>
            </ToggleMenu>
          </div>
        </div>
        <ThemeChange />
      </div>
    </div>
  );
};

export default Navbar;

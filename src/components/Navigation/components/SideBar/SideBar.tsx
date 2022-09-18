import Link from 'next/link';
import { FC, ReactElement, useEffect } from 'react';
import c from 'classnames';
import BaseText from 'components/common/BaseText';
import { useRouter } from 'next/router';
import { navigationRoutes } from 'components/Navigation/contants';
import { useUserSession } from 'hooks/queries/user/useUserSession';
import { HiArrowLeft } from 'react-icons/hi';

import styles from './SideBar.module.scss';

interface Props {
  children: ReactElement;
  menuIsCollapsed: boolean;
  setMenuIsCollapsed: Function;
}

const SideBar: FC<Props> = ({ children, menuIsCollapsed, setMenuIsCollapsed }) => {
  const { session } = useUserSession();
  const router = useRouter();
  const hasWindow = typeof window !== 'undefined';
  const width = hasWindow ? window.innerWidth : null;
  const activeLink = (href: string) => router.asPath === href;

  useEffect(() => {
    if (width || 0 < 800) {
      setMenuIsCollapsed(true);
    }
  }, [width]);

  return (
    <>
      {session?.user ? (
        <div className={styles.containerSidebar}>
          <div
            className={styles.container}
            style={{ minWidth: menuIsCollapsed ? '60px' : '250px' }}
          >
            <div className={styles.containerActionOpenMenu}>
              <div
                onClick={() => setMenuIsCollapsed(!menuIsCollapsed)}
                className={c(
                  styles.actionCollapseMenu,
                  menuIsCollapsed && styles.invertIcon,
                  styles.menuIsCollapse,
                )}
              >
                <HiArrowLeft size={20} />
              </div>
            </div>
            <div className={styles.navigationLinks}>
              {navigationRoutes.map((route: any) => {
                return (
                  <Link key={route.href} href={route.href}>
                    <div
                      className={c(
                        activeLink(route.href) && styles.activeLink,
                        styles.buttonMenu,
                      )}
                    >
                      <div className={styles.icon}>{route.icon}</div>
                      {!menuIsCollapsed && <BaseText text={route.text} />}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          {children}
        </div>
      ) : (
        <div>{children}</div>
      )}
    </>
  );
};

export default SideBar;

import { FC, useCallback, useEffect, useState } from "react";
import { MdOutlineLightMode } from "react-icons/md";

import { useTheme } from "next-themes";
import styles from "./ThemeChange.module.scss";

const DARK = "dark";
const LIGHT = "light";

const ThemeChange: FC = () => {
  const { setTheme } = useTheme();
  const [themeState, setThemeState] = useState(LIGHT);

  const handleSetTheme = useCallback((themeSelected: string) => {
    setTheme(themeSelected);
    setThemeState(themeSelected);
  }, []);

  useEffect(() => {
    setTheme(LIGHT);
  }, [setTheme]);

  return (
    <div className={styles.themeButton}>
      {/* {themeState === DARK ? (
        <div onClick={() => handleSetTheme(LIGHT)}>
          <MdOutlineLightMode className={styles.icon} size={30} />
        </div>
      ) : (
        <div onClick={() => handleSetTheme(DARK)}>
          <MdOutlineLightMode className={styles.iconOn} size={30} />
        </div>
      )} */}
    </div>
  );
};

export default ThemeChange;

import { FC, ReactElement, useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import Navbar from "./components/Navbar";
import Layout from "components/common/Layout";

interface Props {
  children: ReactElement;
}

const Navigation: FC<Props> = ({ children }) => {
  const [menuIsCollapsed, setMenuIsCollapsed] = useState(true);
  const [paddingLayoutLeft, setPaddingLayoutLetf] = useState("");

  useEffect(() => {
    menuIsCollapsed
      ? setPaddingLayoutLetf("80px")
      : setPaddingLayoutLetf("300px");
  }, [menuIsCollapsed]);

  return (
    <>
      <Navbar />
      <SideBar
        menuIsCollapsed={menuIsCollapsed}
        setMenuIsCollapsed={setMenuIsCollapsed}
      >
        <Layout paddingLeft={paddingLayoutLeft}>{children}</Layout>
      </SideBar>
    </>
  );
};

export default Navigation;

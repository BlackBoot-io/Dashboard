import React, { useMemo } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Layout as AntLayout, Drawer } from "antd";
import storageKeys from "../../config/storageKeys";
import { useDispatch, useSelector } from "react-redux";
import Splash from "components/Splash";
import Menu from "components/Panel/comps/Menu";
import routes from "config/routes";
import { useTranslation } from "react-i18next";
import { toggle } from "redux/drawer";
import overviewImage from "assets/images/menus/overview.png";
import transactionsImage from "assets/images/menus/transactions.png";
import crowdsaleImage from "assets/images/menus/crowdsale.png";
import buyImage from "assets/images/menus/buy.png";
import widthrawImage from "assets/images/menus/widthraw.png";
const { Header, Sider, Content } = AntLayout;
const Layout = ({}) => {
  let token = localStorage.getItem(storageKeys.token);
  const { isOpen } = useSelector((x) => x.drawer);
  const { user } = useSelector((x) => x.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const menus = useMemo(
    () => [
      {
        key: "overview",
        label: t("overview"),
        icon: <img src={overviewImage} alt="overview" />,
        childrens: [
          {
            key: "transactions",
            label: t("transactions"),
            icon: <img src={transactionsImage} alt="overview" />,
          },
          {
            key: "crowdsale",
            label: t("crowdsaleSchecule"),
            icon: <img src={crowdsaleImage} alt="overview" />,
          },
        ],
      },
      {
        key: "buy",
        label: t("buyToken"),
        icon: <img src={buyImage} alt={t("buyToken")} />,
      },
      {
        key: "widthraw",
        label: t("widthrawToken"),
        icon: <img src={widthrawImage} alt={t("widthrawToken")} />,
      },
    ],
    []
  );
  if (user)
    return (
      <AntLayout>
        <Drawer
          placement={i18n.dir() === "rtl" ? "right" : "left"}
          onClose={() => dispatch(toggle())}
          visible={isOpen}
          className="drawer"
        >
          <Menu items={menus} mobileSize={true} />
        </Drawer>
        <Sider>
          <Menu items={menus} mobileSize={false} />
        </Sider>
        <AntLayout>
          <Header>Header</Header>
          <Content>
            <Outlet />
          </Content>
        </AntLayout>
      </AntLayout>
    );
  else if (token) return <Splash />;
  else
    return (
      <Navigate
        to={`/${routes.auth}/${routes.login}`}
        state={{ from: location }}
        replace
      />
    );
};
export default Layout;

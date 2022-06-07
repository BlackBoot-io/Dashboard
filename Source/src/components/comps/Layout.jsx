import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Layout as AntLayout } from "antd";
import storageKeys from "../../config/storageKeys";
import { useSelector } from "react-redux";
import Splash from "components/Splash";
import routes from "config/routes";
const { Header, Sider, Content } = AntLayout;
const Layout = ({}) => {
  let token = localStorage.getItem(storageKeys.token);
  const { user } = useSelector((x) => x.auth);
  const location = useLocation();

  if (user)
    return (
      <AntLayout>
        <Sider>Sider</Sider>
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

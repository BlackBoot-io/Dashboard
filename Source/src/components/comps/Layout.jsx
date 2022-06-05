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
  if (!token)
    return (
      <Navigate to={`/${routes.login}`} state={{ from: location }} replace />
    );
  else if (!user) return <Splash />;
  return (
    <AntLayout>
      <Sider>Sider</Sider>
      <Layout>
        <Header>Header</Header>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </AntLayout>
  );
};
export default Layout;

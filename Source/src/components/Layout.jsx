import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Layout as AntLayout } from "antd";
import storageKeys from "../config/storageKeys";
const { Header, Sider, Content } = AntLayout;
const Layout = ({}) => {
  let token = localStorage.getItem(storageKeys.token);
  const location = useLocation();
  if (!token)
    return <Navigate to="/login" state={{ from: location }} replace />;
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

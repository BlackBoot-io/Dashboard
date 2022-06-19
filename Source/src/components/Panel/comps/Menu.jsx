import { Avatar, Menu as AntMenu } from "antd";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoImage from "assets/images/logo.png";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "redux/auth";
import { useLogoutMutation } from "api/account";
const Menu = ({ items }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useSelector((x) => x.auth);
  const dispatch = useDispatch();
  const [
    logoutApi,
    { isLoading, isSuccess, error, isError },
  ] = useLogoutMutation();
  const [state, setState] = useState({
    openKey: "overview",
    selectedKey: "none",
  });
  const onClick = (e) => {
    console.log("click ", e);
    navigate(`/${e.key}`);
  };
  const location = useLocation();
  const setCurrentMenu = useCallback(() => {
    let pathname = window.location.pathname;
    let item = items.find(
      (item) => !item.childrens && pathname.indexOf(item.key) > -1
    );
    if (item) {
      setState({
        openKey: item.key,
        selectedKey: item.key,
      });
    } else {
      let parent = null;
      let child = null;
      for (let x of items.filter((i) => i.children)) {
        child = x.children.find((c) => pathname.indexOf(c.key) > -1);
        if (child) parent = x;
        break;
      }
      if (parent && child)
        setState({
          openKey: parent.key,
          selectedKey: child.key,
        });
    }
  }, []);
  const onOpenChange = (path) => {
    setState((s) => ({ ...s, openKey: path[1] }));
  };
  const handleLogout = async () => {
    const call = await logoutApi().unwrap();
  };
  useEffect(() => {
    if (!isLoading && isSuccess) {
      dispatch(logOut());
    }
  }, [isSuccess]);
  useEffect(() => {
    setCurrentMenu();
  }, [location]);
  return (
    <div id="menu">
      <Link to="/" className="logo">
        <h4>
          <img src={logoImage} alt="logo" />
          <span>{t("appName")}</span>
        </h4>
      </Link>
      <AntMenu
        onClick={onClick}
        onOpenChange={onOpenChange}
        style={{ width: 256 }}
        selectedKeys={[state.selectedKey]}
        openKeys={["overview"]}
        mode="inline"
        items={items}
      />
      <div className="profile">
        <h6 className="title">{t("profile")}</h6>
        <div className="content">
          <div className="user">
            <Avatar size={45}>
              {user.fullName ? user.fullName[0].toUpperCase() : null}
            </Avatar>
            <div className="info">
              <span className="name">{user.fullName}</span>
              <span className="email">{user.email}</span>
            </div>
          </div>
          <button
            className="btn-link"
            onClick={handleLogout}
            disabled={isLoading}
          >
            <svg
              width="21"
              height="17"
              viewBox="0 0 21 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.79467 5.90665C5.0883 5.61449 5.08948 5.13962 4.79732 4.84599C4.50516 4.55237 4.03028 4.55119 3.73666 4.84335L4.79467 5.90665ZM0.596036 7.96835C0.302413 8.26051 0.301229 8.73538 0.59339 9.02901C0.885552 9.32263 1.36042 9.32381 1.65405 9.03165L0.596036 7.96835ZM1.65405 7.96835C1.36042 7.67619 0.885552 7.67737 0.59339 7.97099C0.301229 8.26462 0.302413 8.73949 0.596036 9.03165L1.65405 7.96835ZM3.73666 12.1567C4.03028 12.4488 4.50516 12.4476 4.79732 12.154C5.08948 11.8604 5.0883 11.3855 4.79467 11.0933L3.73666 12.1567ZM1.12504 7.75C0.710828 7.75 0.375041 8.08579 0.375041 8.5C0.375041 8.91421 0.710828 9.25 1.12504 9.25V7.75ZM15.7084 9.25C16.1226 9.25 16.4584 8.91421 16.4584 8.5C16.4584 8.08579 16.1226 7.75 15.7084 7.75V9.25ZM3.73666 4.84335L0.596036 7.96835L1.65405 9.03165L4.79467 5.90665L3.73666 4.84335ZM0.596036 9.03165L3.73666 12.1567L4.79467 11.0933L1.65405 7.96835L0.596036 9.03165ZM1.12504 9.25L15.7084 9.25V7.75L1.12504 7.75V9.25Z"
                fill="#5B626E"
              />
              <path
                d="M7.375 11.625C7.375 13.9262 9.24048 15.7917 11.5417 15.7917H15.7083C18.0095 15.7917 19.875 13.9262 19.875 11.625V5.37504C19.875 3.07385 18.0095 1.20837 15.7083 1.20837H11.5417C9.24048 1.20837 7.375 3.07385 7.375 5.37504"
                stroke="#5B626E"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Menu;

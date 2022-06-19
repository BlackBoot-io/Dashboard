import { Menu as AntMenu } from "antd";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoImage from "assets/images/logo.png";
import { useEffect, useState, useCallback } from "react";
const Menu = ({ items }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
    </div>
  );
};
export default Menu;

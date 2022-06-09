import { Menu as AntMenu } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
const Menu = ({ items }) => {
  const { t } = useTranslation();
  const onClick = (e) => {
    console.log("click ", e);
  };

  return (
    <div id="menu">
      <Link to="/" className="logo">
        <h4>
          <img src="" alt="logo" />
          {t("appName")}
        </h4>
      </Link>
      <AntMenu
        onClick={onClick}
        style={{ width: 256 }}
        defaultSelectedKeys={["overview"]}
        defaultOpenKeys={["overview"]}
        mode="inline"
        items={items}
      />
    </div>
  );
};
export default Menu;

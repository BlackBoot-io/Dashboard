import { Menu as AntMenu } from "antd";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "assets/images/logo.png";
const Menu = ({ items }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const onClick = (e) => {
    console.log("click ", e);
    navigate(`/${e.key}`)
  };

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
        style={{ width: 256 }}
        selectedKeys={["transactions"]}
        openKeys={["overview"]}
        mode="inline"
        items={items}
      />
    </div>
  );
};
export default Menu;

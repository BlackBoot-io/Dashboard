import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Layout as AntLayout, Avatar } from "antd";
import { dark, light } from "../../../redux/theme";
import Icon from "components/comps/Icon";
import { Link } from "react-router-dom";
import routes from "config/routes";
import Utils from "config/utils";
import storageKeys from "config/storageKeys";
import { useCountQuery } from "api/notification";
const { Header } = AntLayout;
const LayoutHeader = () => {
  const { t } = useTranslation();
  const { user } = useSelector((x) => x.auth);
  const { lightMode } = useSelector((x) => x.theme);
  const dispatch = useDispatch();
  const { data, isSuccess } = useCountQuery();
  const handleTheme = (isLight) => {
    if (isLight) {
      dispatch(light());
      document.getElementsByTagName("body")[0].classList.remove("dark");
      Utils.removeStoredData(storageKeys.theme);
    } else {
      dispatch(dark());
      document.getElementsByTagName("body")[0].classList.add("dark");
      Utils.storedData(storageKeys.theme, "dark");
    }
  };
  return (
    <Header id="header">
      <div className="user">
        {t("hello")},&nbsp;
        {user?.fullName}
      </div>
      <div className="actions">
        <Link to={`/${routes.profile}`}>
          <Avatar>
            {user.fullName ? user.fullName[0].toUpperCase() : null}
          </Avatar>
        </Link>
        <Link
          className={`center a-notif ${data && isSuccess && data.data > 0 ? "active" : ""}`}
          to={`/${routes.notifications}`}
        >
          <Icon name="FaRegBell" size={24} />
        </Link>
        <span className="divider"></span>
        <div className="mode">
          <button
            className={`btn-link btn-light ${lightMode ? "active" : ""}`}
            onClick={() => handleTheme(true)}
          >
            <Icon name="FaRegSun" size={24} />
          </button>
          <span className="mode-name">
            {lightMode ? t("lightMode") : t("darkMode")}
          </span>
          <button
            className={`btn-link btn-dark ${!lightMode ? "active" : ""}`}
            onClick={() => handleTheme(false)}
          >
            <Icon name="FaRegMoon" size={24} />
          </button>
        </div>
      </div>
    </Header>
  );
};
export default LayoutHeader;

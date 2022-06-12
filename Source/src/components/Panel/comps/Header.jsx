import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Layout as AntLayout } from "antd";
const { Header } = AntLayout;
const LayoutHeader = () => {
  const { t } = useTranslation();
  const { user } = useSelector((x) => x.auth);
  return (
    <Header id="header">
      <div className="user">
        {t("hello")},&nbsp;
        {user?.fullName}
      </div>
      <div className="actions">
        
      </div>
    </Header>
  );
};
export default LayoutHeader;

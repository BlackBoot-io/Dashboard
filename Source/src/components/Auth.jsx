import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
const Auth = () => {
  const { t } = useTranslation();
  return (
    <div id="auth">
      <Outlet />
    </div>
  );
};
export default Auth;

import Button from "components/comps/Button";
//import Input from "components/comps/Input";
import { useTranslation } from "react-i18next";

const ChangePassword = () => {
  const { t } = useTranslation();
  return <div id="change-password">
    <div id="input-fields">
            {/* <div><Input /></div>
            <div><Input /></div>
            <div><Input /></div>
            <div><Input /></div>
            <div><Input /></div> */}
        </div>
        <div id="update-button">
            <Button>{t("changePassword")}</Button>
        </div>
  </div>;
};
export default ChangePassword;

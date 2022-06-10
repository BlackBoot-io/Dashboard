import Button from "components/comps/Button";
import Input from "components/comps/Input";
import { useTranslation } from "react-i18next";

const UpdateWallet = () => {
  const { t } = useTranslation();
  return <div id="update-wallet">
    <div id="input-fields">
            {/* <div><Input /></div>
            <div><Input /></div>
            <div><Input /></div>
            <div><Input /></div>
            <div><Input /></div> */}
        </div>
        <div id="update-button">
            <Button>{t("updateProfile")}</Button>
        </div>
  </div>;
};
export default UpdateWallet;

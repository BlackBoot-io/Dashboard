import Button from "components/comps/Button";
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
            <Button>{t("updateWallet")}</Button>
        </div>
  </div>;
};
export default UpdateWallet;

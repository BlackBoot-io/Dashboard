import { useTranslation } from "react-i18next"
const Transsactions = ({data,hideActions=true}) => {
const { t } = useTranslation();
return <div id="transaction-list"></div>;
};
export default Transsactions;
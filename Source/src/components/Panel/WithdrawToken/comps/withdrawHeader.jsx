import { useTranslation } from "react-i18next";
import BuyTokenIcon from "assets/images/buy-token.svg";

const WithdrawHeader = () => {
	const { t } = useTranslation();
	return (
		<>
			<span>
				<img src={BuyTokenIcon} alt="logo" />
			</span>
			<h1>{t("withdraw")}</h1>
		</>
	);
};
export default WithdrawHeader;

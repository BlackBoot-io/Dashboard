import { Col, Row, Card} from "antd";
import { useTranslation } from "react-i18next"; 
import BlueCircleBg from "assets/images/blue-circle-bg.svg";

const WithdrawNotices = () => {
	const { t } = useTranslation();
	const withdrawNotifice = [
		"Arrival time : Instant transfer after Email confirmation",
		"Withdrawal will be sent to your intended wallet of card after almost 24 hours",
		"For security reasons, you will not be able to immediately withdraw fiat deposited using a linked bank account or send crypto purchased with such funds off of Coinbase Pro(we call this ``withdrawal availability``)",
		"There are no maximum withdrawal limits on Coinbase Commerce - you can withdraw all funds at any point."
	]
	return (
		<div style={{ width: '100%' }} className="withdraw-card custom-card">
			<img src={BlueCircleBg} className="blue-circle-bg" alt="blue circle background" />
			<div className="withdraw-head">
				<h4 className="withdraw-notice-title">{t("withdrawalNotices")}</h4>
			</div>
			<Row gutter={[24, 16]} style={{ marginTop: 30 }}>
				<Col xs={24} md={24} lg={24}>
					<ul className="withdraw-notice-list"> {withdrawNotifice.map((item, index) =>
						<li className="withdraw-notice-item" key={index}><p className="withdraw-p">* {item}</p></li>
					)}</ul>
				</Col>
				<button className="withdraw-faq-btn">withdraw FAQ</button>
			</Row>
		</div>
	);
};
export default WithdrawNotices;

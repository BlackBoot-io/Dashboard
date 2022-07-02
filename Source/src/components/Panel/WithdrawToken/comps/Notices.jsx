import { Col, Row, Card } from "antd";
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
        <Col xs={24} xl={8} xxl={8} id="withdraw-notice">
            <div style={{ width: "100%" }} className="custom-card with-bg">
                <div className="notice-head">
                    <h4 className="notice-title">{t("withdrawalNotices")}</h4>
                </div>
                <div className="notice-list">
                    <ul className="notice-list"> {withdrawNotifice.map((item, index) =>
                        <li className="notice-item" key={index}>
                            <p className="">
                                * {item}
                            </p>
                        </li>
                    )}</ul>
                   {/* <button className="faq-btn">withdraw FAQ</button>*/}
                </div>
            </div>
        </Col>
    );
};
export default WithdrawNotices;

import { Col, Row, Card, Segmented, Input, Button, Alert, List } from "antd";
import { useTranslation } from "react-i18next";
import BuyTokenIcon from "assets/images/buy-token.svg";
import EtheriumIcon from "assets/images/networks/etherium.svg";
import BlueCircleBg from "assets/images/blue-circle-bg.svg"; 

const WithdrawToken = () => {
    const { t } = useTranslation();
    const withdrawNotifice = [
        "Arrival time : Instant transfer after Email confirmation",
        "Withdrawal will be sent to your intended wallet of card after almost 24 hours",
        "For security reasons, you will not be able to immediately withdraw fiat deposited using a linked bank account or send crypto purchased with such funds off of Coinbase Pro(we call this ``withdrawal availability``)",
        "There are no maximum withdrawal limits on Coinbase Commerce - you can withdraw all funds at any point."
    ]
    return (
        <div id="withdraw-token">
            <Row gutter={[24, 16]}>
                <Col xs={24} md={24} lg={24} className="withdraw-header">
                    <span>
                        <img src={BuyTokenIcon} alt="logo" />
                    </span>
                    <h1>{t("withdraw")}</h1>
                </Col>
                <Col xs={24} md={24} lg={15}>
                    <Card style={{ width: '100%' }} className="withdraw-card">
                        <p className="withdraw-network">
                            Withdraw via network
                        </p>
                        <Segmented
                            block
                            options={[
                                {
                                    label: (
                                        <img src={EtheriumIcon} alt="EtheriumIcon" />
                                    ),
                                    value: 'etherium',
                                },
                                {

                                },
                                {

                                },
                                {

                                },
                            ]}
                        />
                        <Row gutter={[24, 16]} style={{ marginTop: 30 }}>
                            <Col xs={24} md={24} lg={24} style={{ marginBottom: '40px' }}>
                                <label className="withdraw-label">{`${t("walleteAddress")}:`}</label>
                                <Input className="ant-input-holder"/>
                            </Col>
                            {/*<Col xs={24} md={24} lg={24} style={{ marginTop: 20 }}>*/}
                            {/*    <Alert message="You do not have wallete address" />*/}
                            {/*</Col>*/}
                            <Col xs={24} md={24} lg={24}>
                                <label className="withdraw-label">{`${t("withdrawalAmount")}:`}</label>
                                <button className="withdraw-btn-max">Max</button>
                                <p className="withdraw-amount"> Available withdrawal amount:<span className="withdraw-maxamount">{`${"1,254"}`}</span>AVN </p>
                                <Input addonAfter={<span>AVN</span>} />
                                <p className="withdraw-fee">Withdrrawal fees : <span>{`${"1,1"}`}</span> USDT  </p>
                            </Col>
                            <Col xs={24} md={24} lg={24}>
                                <Button className="withdraw-button" style={{ marginTop: 20 }}>
                                    {t("Withdraw")}
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col xs={24} md={24} lg={9}>
                    <Card style={{ width: '100%' }} className="withdraw-card">
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
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
export default WithdrawToken;

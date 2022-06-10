import { Col, Row, Card, Segmented, Input, Button, Progress } from "antd";
import { useTranslation } from "react-i18next";
import BuyTokenIcon from "assets/images/buy-token.svg";
import BagIcon from "assets/images/bag.svg";
import ClockIcon from "assets/images/clock.svg";
import BitcoinIcon from "assets/images/networks/bitcoin.svg";
import BscscanIcon from "assets/images/networks/bscscan.svg";
import EtheriumIcon from "assets/images/networks/etherium.svg";
import SolanaIcon from "assets/images/networks/solana.svg";
import DangerTriangleIcon from "assets/images/danger-triangle.svg";
import BlueCircleBg from "assets/images/blue-circle-bg.svg";

const BuyToken = () => {
  const { t } = useTranslation();
  return (
    <div id="buy-token">
      <Row gutter={[24, 16]}>
        <Col xs={24} md={24} lg={24} className="buy-header">
          <span className="logo-holder">
            <img src={BuyTokenIcon} alt="logo" />
          </span>
          <h1 className="header-title">{t("buyToken")}</h1>
        </Col>
        <Col xs={24} md={24} lg={16}>
          <Card style={{ width: '100%' }} className="buy-card">
            <p className="buy-p">
              Plese choose the network you are going to transfer through.
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
                  label: (
                    <img src={SolanaIcon} alt="BitcoiSolanaIconnIcon" />
                  ),
                  value: 'solana',
                },
                {
                  label: (
                    <img src={BscscanIcon} alt="BscscanIcon" />
                  ),
                  value: 'bscscan',
                },
                {
                  label: (
                    <img src={BitcoinIcon} alt="BitcoinIcon" />
                  ),
                  value: 'bitcoin',
                },
              ]}
            />
            <p className="buy-p" style={{ marginTop: 30 }}>
              Enter the amount in the first box that you would like to contribute to purchase tokens.
            </p>
            <Row gutter={[24, 16]}>
              <Col xs={24} md={24} lg={8}>
                <Input addonAfter={<span>USD</span>} />
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Input addonAfter={<span>ETH</span>} />
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Input addonAfter={<span>AVN</span>} />
              </Col>
              <Col xs={24} md={24} lg={24} style={{ marginTop: 20 }}>
                <img src={DangerTriangleIcon} style={{ marginRight: 5 }} alt="danger icon" />
                <p className="buy-p inline" style={{ marginBottom: 0 }}>
                  The price shown here is not final. When the payment is submitted on the gateway,the network and gas fees will be added.
                </p>
              </Col>
              <Col xs={24} md={24} lg={24}>
                <img src={DangerTriangleIcon} style={{ marginRight: 5 }} alt="danger icon" />
                <p className="buy-p inline">
                  The contribution will be calculated based on the exchange rate at the moment that your transaction is confirmed.
                </p>
                <Button className="buy-button">
                  <img src={BagIcon} style={{ marginRight: 7 }} alt="bag logo" />
                  {t("beginTransaction")}
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} md={24} lg={8}>
          <Card style={{ width: '100%' }} className="buy-card">
            <img src={BlueCircleBg} className="blue-circle-bg" alt="blue circle background" />
            <div className="remain-head">
              <img src={ClockIcon} alt="clock icon" />
              <h4 className="remain-title">{t("remainingTimetobuy")}</h4>
              <span className="remain-time">30 {t("days")}</span>
            </div>
            <p className="remain-subhead">
              {t("publicSale")}
            </p>
            <ul className="remain-list">
              <li>{t("tokenForSale")}<span>3200000 AVN</span></li>
              <li>{t("yourContribution")}<span>0 USDT</span></li>
            </ul>
            <Row className="remain-progress">
              <Col xs={12}>
                <span className="progress-title">{t("raised")}</span>
                <span className="progress-sub">$ 10730</span>
              </Col>
              <Col xs={12} style={{ textAlign: 'right' }}>
                <span className="progress-title">{t("Goal")}</span>
                <span className="progress-sub">$ 38500</span>
              </Col>
              <Progress percent={60} showInfo={false} strokeColor={'#01B969'} />
              <Col xs={12}>
                <span className="progress-text">{t("startAt")} 2 may</span>
              </Col>
              <Col xs={12} style={{ textAlign: 'right' }}>
                <span className="progress-text">{t("endIn")} 28 May</span>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default BuyToken;

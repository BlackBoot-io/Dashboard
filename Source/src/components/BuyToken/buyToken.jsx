import { Col, Row, Card, Select, Segmented, Input, Button } from "antd";
import { useTranslation } from "react-i18next";
import BuyTokenIcon from "assets/images/buy-token.svg";
import BagIcon from "assets/images/bag.svg";
import BitcoinIcon from "assets/images/networks/bitcoin.svg";
import BscscanIcon from "assets/images/networks/bscscan.svg";
import EtheriumIcon from "assets/images/networks/etherium.svg";
import SolanaIcon from "assets/images/networks/solana.svg";
import DangerTriangleIcon from "assets/images/danger-triangle.svg";
import BlueCircleBg from "assets/images/blue-circle-bg.svg";

import { useEffect, useState } from "react";
import { useGetAllQuery } from "api/transaction";
import Utils from "config/utils";
const { Option } = Select;

const BuyToken = () => {
  const { t } = useTranslation();
  return (
    <div id="buy-token">
      <Row gutter={[24, 16]}>
        <Col xs={24} md={24} lg={24} className="buy-header">
          <span>
            <img src={BuyTokenIcon} alt="logo" />
          </span>
          <h1>{t("buyToken")} </h1>
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
                  The price shown here is not final.When the payment is submitted on the gateway,the network and gas fees will be added.
                </p>
              </Col>
              <Col xs={24} md={24} lg={24}>
                <img src={DangerTriangleIcon} style={{ marginRight: 5 }} alt="danger icon" />
                <p className="buy-p inline">
                  The contribution will be calculated based on the exchange rate at the moment that your transaction is confirmed.
                </p>
                <Button className="buy-button" style={{ marginTop: 20 }}>
                  <img src={BagIcon} style={{ marginRight: 7 }} alt="bag logo" />
                  Begin Transaction
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} md={24} lg={8}>
          <Card style={{ width: '100%' }} className="buy-card">
            <img src={BlueCircleBg} className="blue-circle-bg" alt="blue circle background" />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default BuyToken;

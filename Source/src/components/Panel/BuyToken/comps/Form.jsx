import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Col, Row, Segmented, Input, Button, Form } from "antd";
import BagIcon from "assets/images/bag.svg";
import BitcoinIcon from "assets/images/networks/bitcoin.svg";
import BscscanIcon from "assets/images/networks/bscscan.svg";
import EthereumIcon from "assets/images/networks/etherium.svg";
import SolanaIcon from "assets/images/networks/solana.svg";
import DangerTriangleIcon from "assets/images/danger-triangle.svg";

import Confirm from "./Confirm";

const BuyTokenForm = () => {
  const [token, setToken] = useState('eth');
  const [modalVisibility, setModalVisibility] = useState(false);

  const { t } = useTranslation();

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const openDetailModal = () => {
    setModalVisibility(true);
  };
  const closeDetailModal = () => {
    setModalVisibility(false);
  };

  return (
    <Col xs={24} xxl={16} id="buy-form">
      <Confirm modalVisibility={modalVisibility} onClose={closeDetailModal} />
      <div style={{ width: "100%" }} className="buy-card custom-card">
        <p className="buy-p">
          Plese choose the network you are going to transfer through.
        </p>
        <Segmented
          block
          value={token}
          onChange={(value) => setToken(value)}
          options={[
            {
              label: <img src={EthereumIcon} alt="ethereumIcon" />,
              value: "eth"
            },
            {
              label: <img src={SolanaIcon} alt="SolanaIcon" />,
              value: "sol"
            },
            {
              label: <img src={BscscanIcon} alt="BscscanIcon" />,
              value: "bnb"
            },
            {
              label: <img src={BitcoinIcon} alt="BitcoinIcon" />,
              value: "btc"
            },
          ]}
        />
        <p className="buy-p" style={{ marginTop: 30 }}>
          Enter the amount in the first box that you would like to contribute to
          purchase tokens.
        </p>
        <Form
          name="buyTokenForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row gutter={[24, 16]}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                name="usd"
                rules={[
                  { required: true, message: 'This field is required.' },
                  { len: 3, message: 'The deposit can not be less than $100.' }
                ]}
              >
                <Input className="custom-input" addonAfter={<span>usd</span>} />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item name="coin">
                <Input className="custom-input" addonAfter={<span>{ token }</span>} />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item name="avn">
                <Input className="custom-input" addonAfter={<span>avn</span>} />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={24} style={{ marginTop: 20 }}>
              <img
                src={DangerTriangleIcon}
                style={{ marginRight: 5 }}
                alt="danger icon"
              />
              <p className="buy-p inline" style={{ marginBottom: 0 }}>
                The price shown here is not final. When the payment is submitted
                on the gateway,the network and gas fees will be added.
              </p>
            </Col>
            <Col xs={24} md={24} lg={24}>
              <img
                src={DangerTriangleIcon}
                style={{ marginRight: 5 }}
                alt="danger icon"
              />
              <p className="buy-p inline">
                The contribution will be calculated based on the exchange rate at
                the moment that your transaction is confirmed.
              </p>
            </Col>
            <Col xs={24} md={24} lg={24}>
              <Button className="btn-primary w-100 buy-button" htmlType="submit" onClick={openDetailModal}>
                <img src={BagIcon} style={{ marginRight: 7 }} alt="bag logo" />
                {t("beginTransaction")}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Col>
  );
};
export default BuyTokenForm;

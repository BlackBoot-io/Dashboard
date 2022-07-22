import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Col, Row, Segmented, Input, Button, Form, notification } from "antd";

import BagIcon from "assets/images/bag.svg";
import BitcoinIcon from "assets/images/networks/bitcoin.svg";
import BscscanIcon from "assets/images/networks/bscscan.svg";
import EthereumIcon from "assets/images/networks/ethereum.svg";
import SolanaIcon from "assets/images/networks/solana.svg";
import DangerTriangleIcon from "assets/images/danger-triangle.svg";

import { useAddMutation } from "api/transaction";
import { useGetBySymbolMutation } from "api/coinPrice";
import ConfirmModal from "./ConfirmModal";

const openNotification = (type, message) => {
  notification[type]({
    message: message,
  });
};

const BuyTokenForm = (props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [network, setNetwork] = useState(0);
  const [netPrice, setNetPrice] = useState([]);
  const [price, setPrice] = useState(0);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [modalData, setmodalData] = useState('');
  const [data, { isLoading, error, isError }] = useAddMutation();
  const [coinPrice] = useGetBySymbolMutation();
  
  const usdtAmount = useRef();
  const cryptoAmount = useRef();
  const tokenCount = useRef();
  const eth = useRef();
  const sol = useRef();
  const bnb = useRef();
  const btc = useRef();

  const networks = [
    {
      label: <><img src={EthereumIcon} alt="ethereumIcon" /><p ref={eth}></p></>,
      value: 0,
      enum: 2,
      symbol: 'eth',
      name: 'ethereum',
      price: ''
    },
    {
      label: <><img src={SolanaIcon} alt="SolanaIcon" /><p ref={sol}></p></>,
      value: 1,
      enum: 3,
      symbol: 'sol',
      name: 'solana',
      price: ''
    },
    {
      label: <><img src={BscscanIcon} alt="BscscanIcon" /><p ref={bnb}></p></>,
      value: 2,
      enum: 4,
      symbol: 'bnb',
      name: 'binancecoin',
      price: ''
    },
    {
      label: <><img src={BitcoinIcon} alt="BitcoinIcon" /><p ref={btc}></p></>,
      value: 3,
      enum: 1,
      symbol: 'btc',
      name: 'bitcoin',
      price: ''
    },
  ]

  const getPrice = async () => {
    var selecting = networks.map((network) => {
      return `${network.name},` 
    })
    var selected = selecting.join('');
    const response = await coinPrice(selected).unwrap();
    if (response.isSuccess) {
      setNetPrice(response.data);
      // for (var i=0; i<response.data.length; i++) {
      //   `${response.data[i].symbol}`.current.innerText = response.data[i].current_price
      // }
      var price = response.data.find(data => data.symbol === networks[network].symbol).current_price;
      setPrice(price);
    } 
  };

  const changeNework = (value) => {
    setNetwork(value);
  };

  useEffect(() => {
    for (var i=0; i<netPrice.length; i++) {
      if (networks[network].symbol === netPrice[i].symbol) {
        setPrice(netPrice[i].current_price);
      }
    }
  }, [network]);

  useEffect(() => {
    setFormValue('priceChanged');
  }, [price]);

  useEffect(() => {
    getPrice();
    const interval = setInterval(() => {
      getPrice();
    }, 30000);
    return () => {
      clearInterval(interval)
    };
  }, []);

  const setFormValue = (value) => {

    if (value === 'priceChanged') {

      if (cryptoAmount.current.input.value != '') {
        form.setFieldsValue({
          cryptoAmount: (usdtAmount.current.input.value/price).toFixed(6),
          tokenCount: (usdtAmount.current.input.value/props.content.price).toFixed(6),
        });
      }
      
    } else {
      form.setFieldsValue({
        usdtAmount: value !== 'usdtAmount' ? (cryptoAmount.current.input.value*price).toFixed(2) : usdtAmount.current.input.value,
        cryptoAmount: value !== 'cryptoAmount' ? (usdtAmount.current.input.value/price).toFixed(6) : cryptoAmount.current.input.value,
        tokenCount: value !== 'tokenCount' ? (usdtAmount.current.input.value/props.content.price).toFixed(6) : tokenCount.current.input.value,
      });
    }
  };

  const handleSubmit = async (values) => {
    Object.keys(values).forEach(function(el){
      values[el] = parseFloat(values[el])
    })
    const finalData = Object.assign(values, { network: networks[network].enum });
    const response = await data(finalData).unwrap();
    if (!response.isSuccess) {
      openNotification('error', response.message);
      return;
    } else {
      setmodalData(response)
      openConfirmModal();
    }
  };

  const openConfirmModal = () => {
    setModalVisibility(true);
  };

  const closeConfirmModal = () => {
    setModalVisibility(false);
  };

  return (
    <Col xs={24} xl={16} xxl={16} id="buy-form">
      {modalData ? <ConfirmModal modalVisibility={modalVisibility} onClose={closeConfirmModal} content={modalData?.data} formData={form.getFieldValue()} network={networks[network]} /> : ''}
      
      <div style={{ width: "100%" }} className="custom-card buy-card">
        <p className="buy-p">
          Plese choose the network you are going to transfer through.
        </p>
        <Form
          name="buyTokenForm"
          form={form}
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Segmented
            block
            value={network}
            onChange={changeNework}
            options={networks}
          />
          <p className="buy-p" style={{ marginTop: 30 }}>
            Enter the amount in the first box that you would like to contribute to
            purchase tokens.
          </p>
          <Row gutter={[24, 16]}>
            <Col xs={24} md={24} lg={8}>
              <label className="custom-label">{`${t("yourDeposit")}`}</label>
              <Form.Item
                name="usdtAmount"
                onChange={(e) => { setFormValue('usdtAmount') }}
                rules={[
                  { required: true, message: t("required") },
                  {
                    validator(_, value) {
                      if (value >= props.content.minimumBuy) {
                        return Promise.resolve();
                      }
                      return Promise.reject(`The deposit can not be less than $${props.content.minimumBuy}.`);
                    },
                  },
                ]}
              >
                <Input className="custom-input" ref={usdtAmount} addonAfter={<span>usd</span>} />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <label className="custom-label">{`${t("yourDeposit")} in `}<span style={{ textTransform: 'uppercase' }}>{networks[network].symbol}</span></label>
              <Form.Item
                name="cryptoAmount"
                onChange={(e) => { setFormValue('cryptoAmount') }}
              >
                <Input className="custom-input" ref={cryptoAmount} addonAfter={<span>{ networks[network].symbol }</span>} />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <label className="custom-label">{`${t("recieveToken")}`}</label>
              <Form.Item
                name="tokenCount"
                onChange={(e) => { setFormValue('tokenCount') }}
              >
                <Input className="custom-input" ref={tokenCount} addonAfter={<span>avn</span>} />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={24}>
              <img
                src={DangerTriangleIcon}
                style={{ marginRight: 5 }}
                alt="danger icon"
              />
              <p className="buy-p inline small" style={{ marginBottom: 0 }}>
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
              <p className="buy-p inline small">
                The contribution will be calculated based on the exchange rate at
                the moment that your transaction is confirmed.
              </p>
            </Col>
            <Col xs={24} md={24} lg={24}>
              <Button
                className="btn-primary w-100 buy-button"
                loading={isLoading}
                htmlType="submit"
              >
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

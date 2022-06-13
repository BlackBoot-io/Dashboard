import { Col, Form, Input, Row } from "antd";
import { useUpdateWalletMutation } from "api/account";
import Button from "components/comps/Button";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const UpdateWallet = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useDispatch();
  const [updateWallet, { isLoading, error, isError }] = useUpdateWalletMutation();

  const handleSubmit = async (values) => {
    setErrorMsg("");
    const call = await updateWallet(values).unwrap();
    if (!call.isSuccess) {
      setErrorMsg(call.message);
      return;
    }
  };

  const descriptionsWithIcons = [
    {
      icon: <span></span>,
      textColor: '#666D79',
      text: "In order to receive your tokens, please select your intended ERC 20 wallet address that has an ability to add custom tokens or else use Metamask wallet for receiving tokens. You will receive tokens after the token sales end."
    },
    {
      icon: <span></span>,
      textColor: '#666D79',
      text: "Don't use exchange wallet addresses such as Bitfinex, Bitumb, etc."
    },
    {
      icon: <span></span>,
      textColor: '#666D79',
      text: "You can use MetaMask, MyEtherWallet, Mist wallets, etc."
    },
    {
      icon: <span></span>,
      textColor: '#BF2200',
      text: "Don't use the address if you don’t have a private key of your address. You won't receive any tokens and LOOSE YOUR FUNDS if you do so."
    }
  ]

  return <div id="update-wallet">
    <div className="descriptions">
      {descriptionsWithIcons.map(description => (
        <DescriptionBox icon={description.icon} text={description.text} textColor={description.textColor} />
      ))}
    </div>
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
    >
      <Row>
        <Col xs={24}>
          <Form.Item label={<span className="input-label">{t("selectWallet")}</span>}>
            <Input className="custom-input" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Form.Item>
          <Button
            className="btn-primary w-100 update-wallet-button"
            type="submit"
            loading={isLoading}
          >
            {t("updateWallet")}
          </Button>
        </Form.Item>
      </Row>
    </Form>
  </div>;
};

const DescriptionBox = ({ icon, text, textColor }) => {
  return (
    <div className="description">
      <div className="icon-box">
        {icon}
      </div>
      <div className="text-box">
        <p style={{ color: textColor }}>{text}</p>
      </div>
    </div>
  )
}

export default UpdateWallet;

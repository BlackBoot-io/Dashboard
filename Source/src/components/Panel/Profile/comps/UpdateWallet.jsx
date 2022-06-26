import { Col, Form, Input, message, Row } from "antd";
import { useUpdateWalletMutation } from "api/account";
import Button from "components/comps/Button";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const UpdateWallet = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector((x) => x.auth);
  const [updateWallet, { isLoading, error, isError }] = useUpdateWalletMutation();

  const handleSubmit = async (values) => {
    setErrorMsg("");
    const call = await updateWallet(values).unwrap();
    if (!call.isSuccess) {
      setErrorMsg(call.message);
      message.destroy();
      message.error(call.message);
      return;
    }

    message.destroy();
    message.success("Wallet updated successfully.");
  };

  useEffect(() => {
    form.setFieldsValue({
      walletAddress: user.walletAddress,
    })
  }, [])


  const descriptionsWithIcons = [
    {
      textColor: '#666D79',
      text: "In order to receive your tokens, please select your intended ERC 20 wallet address that has an ability to add custom tokens or else use Metamask wallet for receiving tokens. You will receive tokens after the token sales end."
    },
    {
      textColor: '#666D79',
      text: "Don’t use exchange wallet addresses such as Bitfinex, Bithumb, etc."
    },
    {
      textColor: '#666D79',
      text: "You can use MetaMask, MyEtherWallet, Mist wallets, etc."
    },
    {
      textColor: '#BF2200',
      text: "Don’t use the address if you don’t have a private key of your address. You won’t receive any tokens and LOSE YOUR FUNDS if you do so."
    }
  ]

  return <div id="update-wallet">
    <div className="descriptions">
      {descriptionsWithIcons.map(description => (
        <DescriptionBox text={description.text} textColor={description.textColor} />
      ))}
    </div>
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
    >
      <Row>
        <Col xs={24}>
          <Form.Item name="walletAddress" label={<span className="input-label">{t("selectWallet")}</span>}>
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

const DescriptionBox = ({ text, textColor }) => {
  return (
    <div className="description">
      <div className="icon-box">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M15.04 10.8666L9.92665 2.38663C9.71989 2.06317 9.43502 1.79697 9.09831 1.61258C8.76159 1.42819 8.38388 1.33154 7.99998 1.33154C7.61609 1.33154 7.23838 1.42819 6.90166 1.61258C6.56495 1.79697 6.28008 2.06317 6.07332 2.38663L0.959985 10.8666C0.779354 11.1677 0.681178 11.5111 0.675327 11.8622C0.669475 12.2132 0.756155 12.5597 0.926652 12.8666C1.12377 13.2121 1.40909 13.4991 1.75345 13.6982C2.09781 13.8974 2.48887 14.0015 2.88665 14H13.1133C13.5085 14.0042 13.8978 13.9041 14.2419 13.7098C14.586 13.5155 14.8728 13.2338 15.0733 12.8933C15.2488 12.5831 15.3383 12.2317 15.3324 11.8754C15.3266 11.5191 15.2256 11.1708 15.04 10.8666ZM13.9067 12.2333C13.8265 12.371 13.7103 12.4842 13.5704 12.5606C13.4306 12.637 13.2725 12.6736 13.1133 12.6666H2.88665C2.72747 12.6736 2.5694 12.637 2.42956 12.5606C2.28972 12.4842 2.17344 12.371 2.09332 12.2333C2.03481 12.1319 2.004 12.017 2.004 11.9C2.004 11.7829 2.03481 11.668 2.09332 11.5666L7.21332 3.07996C7.30532 2.95843 7.42423 2.85987 7.56072 2.79201C7.6972 2.72415 7.84756 2.68883 7.99998 2.68883C8.15241 2.68883 8.30277 2.72415 8.43925 2.79201C8.57574 2.85987 8.69465 2.95843 8.78665 3.07996L13.9 11.56C13.9608 11.6615 13.9934 11.7774 13.9946 11.8957C13.9957 12.0141 13.9654 12.1306 13.9067 12.2333Z" fill="#BF2200" />
          <path d="M8.00004 11.3333C8.36823 11.3333 8.66671 11.0349 8.66671 10.6667C8.66671 10.2985 8.36823 10 8.00004 10C7.63185 10 7.33337 10.2985 7.33337 10.6667C7.33337 11.0349 7.63185 11.3333 8.00004 11.3333Z" fill="#BF2200" />
          <path d="M8.00004 5.3335C7.82323 5.3335 7.65366 5.40373 7.52864 5.52876C7.40361 5.65378 7.33337 5.82335 7.33337 6.00016V8.66683C7.33337 8.84364 7.40361 9.01321 7.52864 9.13823C7.65366 9.26326 7.82323 9.3335 8.00004 9.3335C8.17685 9.3335 8.34642 9.26326 8.47145 9.13823C8.59647 9.01321 8.66671 8.84364 8.66671 8.66683V6.00016C8.66671 5.82335 8.59647 5.65378 8.47145 5.52876C8.34642 5.40373 8.17685 5.3335 8.00004 5.3335Z" fill="#BF2200" />
        </svg>
      </div>
      <div className="text-box">
        <div style={{ color: textColor }}>{text}</div>
      </div>
    </div>
  )
}

export default UpdateWallet;

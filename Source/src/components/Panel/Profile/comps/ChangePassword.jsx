import { Col, Form, Input, message, Row, Tooltip } from "antd";
import { useChangePasswordMutation } from "api/account";
import Button from "components/comps/Button";
import Utils from "config/utils";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [errorMsg, setErrorMsg] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  const dispatch = useDispatch();
  const [changePassword, { isLoading, error, isError }] = useChangePasswordMutation();


  const handleSubmit = async (values) => {
    try {
      const call = await changePassword(values).unwrap();
      if (!call.isSuccess) {
        message.error(t("updateFailed"));
        return;
      }
      message.success(t("changePasswordSuccess"));
    } catch (e) {
      message.error(t("updateFailed"));
    }
  };

  // === newPasswordValidation ===
  const [uppercaseAndLowercaseValid, setUppercaseAndLowercaseValid] = useState(false);
  const [oneNumberValid, setOneNumberValid] = useState(false);
  const [oneSymbolValid, setOneSymbolValid] = useState(false);
  const [eightCharactersValid, setEightCharactersValid] = useState(false);

  const uppercaseAndLowercaseText = 'contain uppercase and lowercase characters';
  const oneNumberText = 'contain at least one number';
  const oneSymbolText = 'contain at least one symbol';
  const eightCharactersText = 'contain at least 8 characters';

  const errorIcon = <svg xmlns="http://www.w3.org/2000/svg" width="10" height="9" viewBox="0 0 7 7" fill="none">
    <path d="M0.814893 5.44037C0.62079 5.63679 0.622663 5.95337 0.819077 6.14747C1.01549 6.34157 1.33207 6.3397 1.52617 6.14328L0.814893 5.44037ZM3.79088 3.85162C3.98498 3.6552 3.98311 3.33863 3.78669 3.14452C3.59028 2.95042 3.2737 2.95229 3.0796 3.14871L3.79088 3.85162ZM3.0796 3.14871C2.8855 3.34512 2.88737 3.6617 3.08378 3.8558C3.2802 4.04991 3.59677 4.04803 3.79088 3.85162L3.0796 3.14871ZM6.05558 1.55995C6.24969 1.36354 6.24781 1.04696 6.0514 0.852857C5.85498 0.658754 5.53841 0.660627 5.3443 0.857041L6.05558 1.55995ZM3.79088 3.14871C3.59677 2.95229 3.2802 2.95042 3.08378 3.14452C2.88737 3.33863 2.8855 3.6552 3.0796 3.85162L3.79088 3.14871ZM5.3443 6.14328C5.53841 6.3397 5.85498 6.34157 6.0514 6.14747C6.24781 5.95337 6.24969 5.63679 6.05558 5.44037L5.3443 6.14328ZM3.0796 3.85162C3.2737 4.04803 3.59028 4.04991 3.78669 3.8558C3.98311 3.6617 3.98498 3.34512 3.79088 3.14871L3.0796 3.85162ZM1.52617 0.857041C1.33207 0.660627 1.01549 0.658754 0.819077 0.852857C0.622663 1.04696 0.62079 1.36354 0.814893 1.55995L1.52617 0.857041ZM1.52617 6.14328L3.79088 3.85162L3.0796 3.14871L0.814893 5.44037L1.52617 6.14328ZM3.79088 3.85162L6.05558 1.55995L5.3443 0.857041L3.0796 3.14871L3.79088 3.85162ZM3.0796 3.85162L5.3443 6.14328L6.05558 5.44037L3.79088 3.14871L3.0796 3.85162ZM3.79088 3.14871L1.52617 0.857041L0.814893 1.55995L3.0796 3.85162L3.79088 3.14871Z" fill="#D22600" />
  </svg>;
  const correctIcon = <svg xmlns="http://www.w3.org/2000/svg" width="10" height="9" viewBox="0 0 7 6" fill="none">
    <path d="M0.887207 3.2085L2.64877 5.0835L6.17152 1.3335" stroke="#009C7B" stroke-linecap="round" stroke-linejoin="round" />
  </svg>;

  const newPasswordValidation = (value) => {
    setEightCharactersValid(value.length >= 8)
    setUppercaseAndLowercaseValid(Utils.hasLowerCase(value) && Utils.hasUpperCase(value))
    setOneNumberValid(Utils.hasNumber(value))
    setOneSymbolValid(Utils.hasSpecialSymbol(value))
  }
  // === newPasswordValidation ===

  return <div id="change-password">
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
    >
      <Row className="row">
        <Col xs={24}>
          <Form.Item name="oldPassword" label={<span className="input-label">{t("oldPassword")}</span>}>
            <Input.Password className="custom-input" />
          </Form.Item>
        </Col>
      </Row>
      <Row className="row">
        <Col xs={24}>

          <Tooltip
            title={<>
              <div style={{ fontSize: '12px' }}>{uppercaseAndLowercaseValid ? correctIcon : errorIcon} {uppercaseAndLowercaseText}</div>
              <div style={{ fontSize: '12px' }}>{oneNumberValid ? correctIcon : errorIcon} {oneNumberText}</div>
              <div style={{ fontSize: '12px' }}>{oneSymbolValid ? correctIcon : errorIcon} {oneSymbolText}</div>
              <div style={{ fontSize: '12px' }}>{eightCharactersValid ? correctIcon : errorIcon} {eightCharactersText}</div>
            </>}
            placement="right"
            color="white"
            visible={showTooltip}
            overlayInnerStyle={{
              backgroundColor: '#FFFFFF',
              boxShadow: '0px 4px 10px rgba(47, 83, 109, 0.1)',
              borderRadius: '8px',
              color: '#000000',
              fontSize: '11px',
            }}>
            <Form.Item name="newPassword" onChange={(e) => {
              newPasswordValidation(e.target.value)
            }} label={<span className="input-label">{t("newPassword")}</span>} rules={[
              {},
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (uppercaseAndLowercaseValid && oneNumberValid && oneSymbolValid && eightCharactersValid) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('New password not satisfying the conditions.'));
                },
              }),
            ]}>
              <Input.Password
                className="custom-input"
                onFocus={() => setShowTooltip(true)}
                onBlur={() => setShowTooltip(false)}
              />
            </Form.Item>
          </Tooltip>
        </Col>
      </Row>
      <Row className="row">
        <Col xs={24}>
          <Form.Item name="confirmNewPassword" label={<span className="input-label">{t("confirmNewPassword")}</span>} rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}>
            <Input.Password className="custom-input" />
          </Form.Item>
        </Col>
      </Row>
      <Row className="button">
        <Form.Item>
          <Button
            className="btn-primary w-100 change-password-button"
            type="submit"
            loading={isLoading}
          >
            {t("changePassword")}
          </Button>
        </Form.Item>
      </Row>
    </Form>
  </div>;
};

export default ChangePassword;

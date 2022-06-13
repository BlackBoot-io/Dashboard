import { Col, Form, Input, Row } from "antd";
import { useChangePasswordMutation } from "api/account";
import Button from "components/comps/Button";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useDispatch();
  const [changePassword, { isLoading, error, isError }] = useChangePasswordMutation();


  const handleSubmit = async (values) => {
    setErrorMsg("");
    const call = await changePassword(values).unwrap();
    if (!call.isSuccess) {
      setErrorMsg(call.message);
      return;
    }
  };

  return <div id="change-password">
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
    >
      <Row>
        <Col xs={24}>
          <Form.Item label={<span className="input-label">{t("oldPassword")}</span>}>
            <Input.Password className="custom-input" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <Form.Item label={<span className="input-label">{t("newPassword")}</span>}>
            <Input.Password className="custom-input" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <Form.Item label={<span className="input-label">{t("confirmNewPassword")}</span>}>
            <Input.Password className="custom-input" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Form.Item>
          <Button
            className="btn-primary w-100"
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

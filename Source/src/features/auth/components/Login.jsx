import { Form, Input, Space } from "antd";
import { useTranslation } from "react-i18next";
const Login = () => {
  const { t } = useTranslation();
  const handleSubmit = (values) => {
    console.log(values);

  };
  const invalid = () => {};
  return (
    <div id="login">
      <Form
        name="login"
        layout="vertical"
        onFinish={handleSubmit}
        onFinishFailed={invalid}
        autoComplete="off"
        size="large"
      >
        <Space direction="vertical" size="small" className="w-100">
          <Form.Item
            label={t("username")}
            name="userName"
            rules={[{ required: true, message: t("required") }]}
          >
            <Input
              className="ltr-elm ph-r"
              placeholder={t("enterYourUsername")}
            />
          </Form.Item>
          <Form.Item
            className="mb-0"
            label={t("password")}
            name="password"
            rules={[{ required: true, message: t("required") }]}
            // extra="We must make sure that your are a human."
          >
            <Input.Password
              className="ltr-input ph-r"
              placeholder={t("enterYourPassword")}
            />
          </Form.Item>
          <Form.Item className="mb-1">
            <button className="w-100" type="submit">
              {t("signin")}
            </button>
          </Form.Item>
        </Space>
      </Form>
    </div>
  );
};
export default Login;

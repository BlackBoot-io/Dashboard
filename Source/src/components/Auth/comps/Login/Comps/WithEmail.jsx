import { useTranslation } from "react-i18next";
import { Form, Input, Space, Checkbox } from "antd";
import Button from "components/comps/Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import routes from "config/routes";
import Icon from "components/comps/Icon";
import Alert from "components/comps/Alert";
import GoogleImage from "assets/images/google.svg";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "api/account";
import { setCredentials } from "redux/auth";

const ByEmail = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [login, { isLoading, error, isError }] = useLoginMutation();
  const [errorMsg, setErrorMsg] = useState("");
  const nav = useNavigate();
  const handleSubmit = async (values) => {
    setErrorMsg("");
    const call = await login(values).unwrap();
    console.log("after call", call.data);
    if (!call.isSuccess) {
      setErrorMsg(t("wrongUsernameOrPassword"));
      return;
    }
    dispatch(setCredentials(call.data));
    nav(`/${routes.transactions}`);
  };
  const invalid = () => {};
  return (
    <div id="auth-by-email">
      <Form
        name="login-form"
        layout="vertical"
        onFinish={handleSubmit}
        onFinishFailed={invalid}
        autoComplete="off"
        size="large"
        initialValues={
          process.env.NODE_ENV === "development"
            ? {
                email: "Admin@BlackBoot.io",
                password: "Adm!nP@ssw0rd",
              }
            : {}
        }
      >
        <Space direction="vertical" size={10} className="w-100">
          {errorMsg || isError ? (
            <Alert message={errorMsg ?? t("unknownError")} type="error" />
          ) : null}
          <Form.Item
            label={t("email")}
            name="email"
            rules={[{ required: true, message: t("required") }]}
          >
            <Input className="ltr-elm" suffix="@" />
          </Form.Item>
          <Form.Item
            className="mb-0"
            label={t("password")}
            name="password"
            rules={[{ required: true, message: t("required") }]}
            // extra="We must make sure that your are a human."
          >
            <Input.Password className="ltr-input" />
          </Form.Item>
          <Form.Item className="mb-0" name="remember" valuePropName="checked">
            <div className="remeber-me-wrapper">
              <Checkbox>{t("rememberMe")}</Checkbox>
              <Link to={`/${routes.recoverPassword}`}>
                {t("recoverPassword")}
              </Link>
            </div>
          </Form.Item>
          <Form.Item className="mb-1">
            <Button
              className="w-100 btn-primary"
              type="submit"
              loading={isLoading}
            >
              {t("login")}
            </Button>
          </Form.Item>
        </Space>
      </Form>
      <div className="btn-secondary google-login" role="button">
        <img src={GoogleImage} alt="google" />
      </div>
      <div className="signup">
        <span>{t("notSignedup")}</span>&nbsp;
        <Link to={`/${routes.auth}/${routes.signup}`}>{t("signup")}</Link>
      </div>
    </div>
  );
};
export default ByEmail;

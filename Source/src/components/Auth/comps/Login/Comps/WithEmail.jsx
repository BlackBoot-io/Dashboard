import { useTranslation } from "react-i18next";
import { Form, Input, Space, Checkbox, message } from "antd";
import Button from "components/comps/Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import routes from "config/routes";
import Alert from "components/comps/Alert";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "api/account";
import { setCredentials } from "redux/auth";

const ByEmail = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [login, { isLoading, error, isError }] = useLoginMutation();
  const nav = useNavigate();
  const handleSubmit = async (values) => {
    try {
      const call = await login(values).unwrap();
      console.log("after call", call.data);
      if (!call.isSuccess) {
        message.error(t("wrongUsernameOrPassword"));
        return;
      }
      dispatch(setCredentials(call.data));
      nav(`/${routes.dashboard}`);
    } catch (e) {
      console.log(e);
      message.error(e.data?.message?t(e.data?.message):t("wrongUsernameOrPassword"));
    }
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
        <Space direction="vertical" size={5} className="w-100">
          {/* {errorMsg || isError ? (
            <Alert message={errorMsg ?? t("unknownError")} type="error" />
          ) : null} */}
          <Form.Item
            label={t("email")}
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: t("invalidEmail"),
              },
            ]}
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
                {/* {t("recoverPassword")} */}
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
          <Form.Item>
            <button
              type="button"
              className="btn-secondary google-auth"
              role="button"
            >
              <svg
                width="17"
                height="18"
                viewBox="0 0 17 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.4456 7.60805H14.875V7.57865H8.50001V10.412H12.5032C11.9191 12.0613 10.3498 13.2453 8.50001 13.2453C6.15294 13.2453 4.25001 11.3424 4.25001 8.99532C4.25001 6.64826 6.15294 4.74532 8.50001 4.74532C9.5834 4.74532 10.569 5.15403 11.3195 5.82163L13.323 3.81811C12.058 2.63909 10.3658 1.91199 8.50001 1.91199C4.58823 1.91199 1.41667 5.08355 1.41667 8.99532C1.41667 12.9071 4.58823 16.0787 8.50001 16.0787C12.4118 16.0787 15.5833 12.9071 15.5833 8.99532C15.5833 8.52038 15.5345 8.05678 15.4456 7.60805Z"
                  fill="#FFC107"
                />
                <path
                  d="M2.23337 5.69838L4.5606 7.40511C5.19031 5.84607 6.71535 4.74532 8.49999 4.74532C9.58339 4.74532 10.569 5.15403 11.3195 5.82163L13.323 3.81811C12.058 2.63909 10.3657 1.91199 8.49999 1.91199C5.77928 1.91199 3.41983 3.44801 2.23337 5.69838Z"
                  fill="#FF3D00"
                />
                <path
                  d="M8.5 16.0787C10.3296 16.0787 11.9921 15.3785 13.249 14.2399L11.0567 12.3847C10.3217 12.9437 9.42347 13.2461 8.5 13.2454C6.65762 13.2454 5.09327 12.0706 4.50394 10.4312L2.19406 12.2108C3.36635 14.5048 5.74706 16.0787 8.5 16.0787Z"
                  fill="#4CAF50"
                />
                <path
                  d="M15.4456 7.60813H14.875V7.57874H8.5V10.4121H12.5031C12.2238 11.197 11.7206 11.883 11.0557 12.3851L11.0567 12.3844L13.249 14.2395C13.0939 14.3805 15.5833 12.5371 15.5833 8.9954C15.5833 8.52046 15.5345 8.05686 15.4456 7.60813Z"
                  fill="#1976D2"
                />
              </svg>
              <span>{t("signinWithGoogle")}</span>
            </button>
          </Form.Item>
        </Space>
      </Form>

      <div className="redirect">
        <span>{t("notSignedup")}</span>&nbsp;
        <Link to={`/${routes.auth}/${routes.signup}`}>{t("signup")}</Link>
      </div>
    </div>
  );
};
export default ByEmail;

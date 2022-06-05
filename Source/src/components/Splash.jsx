import { Spin } from "antd";
import { useGetCurrentUserInfoQuery } from "api/account";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setCredentials } from "redux/auth";
const Splash = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCurrentUserInfoQuery();
  useEffect(() => {
    if (isSuccess) {
      dispatch(setCredentials(data));
    }
  }, [isSuccess, isError]);
  return (
    <div id="splash">
      <h1>{t("loading")}</h1>
      <Spin />
    </div>
  );
};
export default Splash;

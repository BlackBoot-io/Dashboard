import { Spin } from "antd";
import { useGetCurrentUserInfoQuery } from "api/account";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "redux/auth";
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
    console.log("spalsh", data, isSuccess, isError);
    if (isSuccess && data) {
      dispatch(setCurrentUser(data?.data));
    }
  }, [isSuccess, isError]);
  return (
    <div id="splash">
      <h1>{t("loading")}...</h1>
      <Spin />
    </div>
  );
};
export default Splash;

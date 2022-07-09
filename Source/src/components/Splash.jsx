import { message, Spin } from "antd";
import { useGetCurrentUserInfoMutation } from "api/account";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "redux/auth";
import utils from "config/utils";
const Splash = ({ doNothing }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [getUserData, extra] = useGetCurrentUserInfoMutation();
  const fetchUserData = async () => {
    try {
      const call = await getUserData().unwrap();
      if (!call.isSuccess) {
        message.error(t("unknownError"));
        return;
      }
      dispatch(setCurrentUser(call.data));
    } catch (e) {
      message.error(
        e.data?.message ? t(e.data?.message) : t("unknownError")
      );
    }
  };
  useEffect(() => {
    if (!doNothing) {
      console.log("fired")
      fetchUserData();
    }
  }, []);
  return (
    <div id="splash">
      <h1>{t("loading")}...</h1>
      <Spin />
    </div>
  );
};
export default Splash;

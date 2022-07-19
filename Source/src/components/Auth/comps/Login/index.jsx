import { Tabs } from 'antd';
import { useTranslation } from "react-i18next";
import WithEmail from "./Comps/WithEmail";
import OAuth from "./Comps/OAuth";

const { TabPane } = Tabs;
const Login = () => {
  const { t } = useTranslation();

  return (
    <div id="login">
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab={t("loginWithEmail")} key="1">
          <WithEmail />
        </TabPane>
        {/* <TabPane tab={t("loginWithWallet")} disabled key="2">
          <OAuth />
        </TabPane> */}
      </Tabs>
    </div>
  );
};
export default Login;

import { Row, Col, message } from "antd";
import { useCurrentCrowdsaleSchedulesQuery } from "api/crowdsaleSchedule";
import { useUserBalanceQuery } from "api/transaction";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Crowdsale from "./Comps/Crowdsale";
import ExchangeList from "./Comps/ExchangeList";
import Transactions from "components/Panel/comps/Transactions";
import Balance from "./Comps/Balance";
const Dashboard = () => {
  const { t } = useTranslation();
  const crowdsale = useCurrentCrowdsaleSchedulesQuery();
  const userBalance = useUserBalanceQuery();
  useEffect(() => {
    if (crowdsale.isError) message.error(t("unknownError"));
    else if (crowdsale.data && !crowdsale.data.isSuccess)
      message.error(crowdsale.data.message);
  }, [crowdsale.isLoading]);
  useEffect(() => {
    if (userBalance.isError) message.error(t("unknownError"));
    else if (userBalance.data && !userBalance.data.isSuccess)
      message.error(userBalance.data.message);
  }, [userBalance.isLoading]);
  return (
    <div id="dashboard">
      <Row>
        <Col xs={24} sm={8}>
          <Crowdsale />
        </Col>
        <Col xs={24} sm={16}>
          <Row>
            <Col xs={24} sm={18}>
              <Balance />
            </Col>
            <Col xs={24} sm={6}>
              <ExchangeList />
            </Col>
            <Col xs={24} sm={24}>
              <Transactions />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
export default Dashboard;

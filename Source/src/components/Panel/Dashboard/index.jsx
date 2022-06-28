import { Row, Col, message } from "antd";
import { useCurrentCrowdsaleSchedulesQuery } from "api/crowdsaleSchedule";
import { useGetUserBalanceQuery } from "api/transaction";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Crowdsale from "./Comps/Crowdsale";
import ExchangeList from "./Comps/ExchangeList";
import Transactions from "components/Panel/comps/Transactions";
import Balance from "./Comps/Balance";
import config from "config/settings";
const Dashboard = () => {
  const { t } = useTranslation();
  const crowdsale = useCurrentCrowdsaleSchedulesQuery();
  const userBalance = useGetUserBalanceQuery();
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
  console.log("d", crowdsale.data);
  return (
    <div id="dashboard">
      <Row>
        <Col xs={24} sm={17}>
          <Row gutter={[config.offset4, config.offset4]}>
            <Col xs={24} sm={15}>
              <Balance
                loading={userBalance.isLoading || crowdsale.isLoading}
                totalToken={userBalance.data?.data}
                currentIncreaseRate={crowdsale.data?.data?.currentIncreaseRate}
                currentPrice={crowdsale.data?.data?.price}
              />
            </Col>
            <Col xs={24} sm={9}>
              <ExchangeList />
            </Col>
            <Col xs={24} sm={24}>
              <Transactions />
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={7}>
          <Crowdsale
            loading={crowdsale.isLoading}
            data={crowdsale.data?.data}
          />
        </Col>
      </Row>
    </div>
  );
};
export default Dashboard;

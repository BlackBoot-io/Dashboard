import { Row, Col, message } from "antd";
import {
  useCurrentCrowdsaleSchedulesQuery,
  useAllCrowdsaleSchedulesQuery,
} from "api/crowdsaleSchedule";
import { useGetUserBalanceQuery, useGetAllQuery } from "api/transaction";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Crowdsale from "./Comps/Crowdsale";
import ExchangeList from "./Comps/ExchangeList";
import Transactions from "components/Panel/comps/Transactions";
import Balance from "./Comps/Balance";
import config from "config/settings";
const Dashboard = () => {
  const { t } = useTranslation();
  const currentCrowdsale = useCurrentCrowdsaleSchedulesQuery();
  const allCrowdsales = useAllCrowdsaleSchedulesQuery();
  const userBalance = useGetUserBalanceQuery();
  const allTrans = useGetAllQuery();
  useEffect(() => {
    if (currentCrowdsale.isError) message.error(t("unknownError"));
    else if (currentCrowdsale.data && !currentCrowdsale.data.isSuccess)
      message.error(currentCrowdsale.data.message);
  }, [currentCrowdsale.isLoading]);
  useEffect(() => {
    if (userBalance.isError) message.error(t("unknownError"));
    else if (userBalance.data && !userBalance.data.isSuccess)
      message.error(userBalance.data.message);
  }, [userBalance.isLoading]);
  useEffect(() => {
    if (allCrowdsales.isError) message.error(t("unknownError"));
    else if (allCrowdsales.data && !allCrowdsales.data.isSuccess)
      message.error(allCrowdsales.data.message);
  }, [allCrowdsales.isLoading]);
  return (
    <div id="dashboard">
      <Row>
        <Col xs={24} sm={17}>
          <Row gutter={[config.offset3, config.offset3]}>
            <Col xs={24} sm={15}>
              <Balance
                loading={userBalance.isLoading || currentCrowdsale.isLoading}
                totalToken={userBalance.data?.data}
                currentIncreaseRate={
                  currentCrowdsale.data?.data?.currentIncreaseRate
                }
                currentPrice={currentCrowdsale.data?.data?.price}
              />
            </Col>
            <Col xs={24} sm={9}>
              <ExchangeList />
            </Col>
            <Col xs={24} sm={24}>
              <Transactions
                className="custom-card"
                showHeaderIcon={false}
                loading={allTrans.isLoading}
                data={allTrans.data?.data}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={7}>
          <Crowdsale
            loading={(currentCrowdsale.isLoading, allCrowdsales.isLoading)}
            current={currentCrowdsale.data?.data}
            allSales={allCrowdsales.data?.data}
          />
        </Col>
      </Row>
    </div>
  );
};
export default Dashboard;

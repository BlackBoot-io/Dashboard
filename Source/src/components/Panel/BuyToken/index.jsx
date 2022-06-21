import { useTranslation } from "react-i18next";
import { Col, Row, Spin } from "antd";
import BuyTokenIcon from "assets/images/buy-token.svg";
import BuyTokenForm from "components/Panel/BuyToken/comps/Form";
import Info from "components/Panel/BuyToken/comps/Info";
import { useCurrentCrowdsaleSchedulesQuery } from "api/crowdsaleSchedule";

const BuyToken = () => {
  const { t } = useTranslation();
  const { isLoading, isSuccess, data } = useCurrentCrowdsaleSchedulesQuery();

  return (
    <div id="buy-token">
      <Row gutter={[24, 16]}>
        <Col xs={24} md={24} lg={24} className="buy-header">
          <span className="logo-holder">
            <img src={BuyTokenIcon} alt="logo" />
            {/* <Icon name={'FaDownload'} size={24} /> */}
          </span>
          <h1 className="header-title">{t("buyToken")}</h1>
        </Col>
        {!isLoading ?  
          <>
            <BuyTokenForm content={data?.data} />
            <Info content={data?.data} />
          </>
        : 
          <Col xs={24} style={{ display: "flex", justifyContent: "center" }}>
            <Spin />
          </Col>
        }
      </Row>
    </div>
  );
};
export default BuyToken;

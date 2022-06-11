import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import Icon from "components/comps/Icon";
import BuyTokenIcon from "assets/images/buy-token.svg";

import Form from "components/Panel/BuyToken/comps/Form";
import Info from "components/Panel/BuyToken/comps/Info";

const BuyToken = () => {
  const { t } = useTranslation();
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
        <Form />
        <Info />
      </Row>
    </div>
  );
};
export default BuyToken;

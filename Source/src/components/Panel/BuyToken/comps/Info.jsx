import { useTranslation } from "react-i18next";
import { Col, Row, Card, Progress } from "antd";
import ClockIcon from "assets/images/clock.svg";

const Info = () => {
  const { t } = useTranslation();
  return (
    <Col xs={24} md={24} lg={8}>
      <Card style={{ width: "100%" }} className="custom-card with-bg">
        <div className="remain-head">
          <img src={ClockIcon} alt="clock icon" />
          <h4 className="remain-title">{t("remainingTimetobuy")}</h4>
          <span className="remain-time">30 {t("days")}</span>
        </div>
        <p className="remain-subhead">{t("publicSale")}</p>
        <ul className="remain-list">
          <li>
            {t("tokenForSale")}
            <span>3200000 AVN</span>
          </li>
          <li>
            {t("yourContribution")}
            <span>0 USDT</span>
          </li>
        </ul>
        <Row className="remain-progress">
          <Col xs={12}>
            <span className="progress-title">{t("raised")}</span>
            <span className="progress-sub">$ 10730</span>
          </Col>
          <Col xs={12} style={{ textAlign: "right" }}>
            <span className="progress-title">{t("Goal")}</span>
            <span className="progress-sub">$ 38500</span>
          </Col>
          <Progress percent={60} showInfo={false} strokeColor={"#01B969"} />
          <Col xs={12}>
            <span className="progress-text">{t("startAt")} 2 may</span>
          </Col>
          <Col xs={12} style={{ textAlign: "right" }}>
            <span className="progress-text">{t("endIn")} 28 May</span>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};
export default Info;

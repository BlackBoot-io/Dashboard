import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Col, Row, Progress } from "antd";
import ClockIcon from "assets/images/clock.svg";
import moment from 'moment'

const Info = (props) => {
  const { t } = useTranslation();
  const [remainingDays, setRemainingDays] = useState("");

  useEffect(() => {
    var eventTime = moment(props.content.to); 
    var currentTime = moment();
    setRemainingDays(moment.duration(eventTime.diff(currentTime, 'seconds'), "seconds").days());
  }, [props.content]);
  
  return (
    <Col xs={24} xl={8} xxl={8} id="buy-info">
      <div style={{ width: "100%" }} className="custom-card flex-col with-bg-single">
        <div>
          <div className="remain-head">
            <img src={ClockIcon} alt="clock icon" />
            <h4 className="remain-title">{t("remainingTimetobuy")}</h4>
            <span className="remain-time">{remainingDays} {t("days")}</span>
          </div>
          <p className="remain-subhead">{props.content.title}</p>
        </div>
        <ul className="remain-list">
          <li>
            {t("tokenForSale")}
            <span>{props.content.tokenForSale.toLocaleString()} AVN</span>
          </li>
          <li>
            {t("yourContribution")}
            <span>0 USDT</span>
          </li>
        </ul>
        <Row className="remain-progress">
          <Col xs={12}>
            <span className="progress-title">{t("raised")}</span>
            <span className="progress-sub">$ {props.content.currentInvestment.toLocaleString()}</span>
          </Col>
          <Col xs={12} style={{ textAlign: "right" }}>
            <span className="progress-title">{t("Goal")}</span>
            <span className="progress-sub">$ {props.content.investmentGoal.toLocaleString()}</span>
          </Col>
          <Progress percent={(props.content.currentInvestment/props.content.investmentGoal)*100} showInfo={false} strokeColor={"#01B969"} />
          <Col xs={12}>
            <span className="progress-text">{t("startAt")} {moment(props.content.from, 'YYYY-MM-DD').format("MMMM DD")}</span>
          </Col>
          <Col xs={12} style={{ textAlign: "right" }}>
            <span className="progress-text">{t("endIn")} {moment(props.content.to, 'YYYY-MM-DD').format("MMMM DD")}</span>
          </Col>
        </Row>
      </div>
    </Col>
  );
};
export default Info;

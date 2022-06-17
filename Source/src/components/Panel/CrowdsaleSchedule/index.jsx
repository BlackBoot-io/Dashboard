import { useTranslation } from "react-i18next";
import { Row, Col, Spin } from "antd";
import { useState } from "react";
import Icon from "components/comps/Icon";
import Carousel from "components/Panel/CrowdsaleSchedule/comps/Carousel";
import { useAllQuery } from "api/crowdsaleSchedule";
import TimeLine from "components/Panel/CrowdsaleSchedule/comps/TimeLine";
import { useEffect } from "react";

const CrowdsaleSchedule = () => {
  const { t } = useTranslation();
  const { isLoading, isSuccess, data } = useAllQuery();
  const [state, setState] = useState({
    currentSlide: 0,
  });
  useEffect(() => {
    if (isLoading || !data || !data.isSuccess) return;
    let idx = data.data.reverse().findIndex((x) => x.isActive);
    if (idx > -1) setState((s) => ({ ...s, currentSlide: idx }));
  }, [isLoading, isSuccess]);
  return (
    <div id="crowdsale-schedule">
      <div xs={24} sm={24} className="page-header">
        <div className="heading">
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="44" height="44" rx="8" fill="#753FF8" />
          </svg>
          <h1 className="header-title">{t("buyToken")}</h1>
        </div>
        <div className="carousel-nav">
          <button className="btn-link">
            <Icon name="FaChevronLeft" />
          </button>
          <button className="btn-link">
            <Icon name="FaChevronRight" />
          </button>
        </div>
      </div>
      <Row>
        {isLoading || !data ? (
          <Col xs={24} sm={24} className="center loading-wrapper">
            <Spin />
          </Col>
        ) : (
          <>
            <Carousel current={state.currentSlide} />
            <TimeLine />
          </>
        )}
      </Row>
    </div>
  );
};
export default CrowdsaleSchedule;

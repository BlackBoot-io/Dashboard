import { useTranslation } from "react-i18next";
import { Row, Col, Spin } from "antd";
import { useState } from "react";
import Icon from "components/comps/Icon";
import Carousel from "components/Panel/CrowdsaleSchedule/comps/Carousel";
import { useAllCrowdsaleSchedulesQuery } from "api/crowdsaleSchedule";
import TimeLine from "components/Panel/CrowdsaleSchedule/comps/TimeLine";
import { useEffect } from "react";
import { useRef } from "react";
import { useCallback } from "react";

const CrowdsaleSchedule = () => {
  const { t } = useTranslation();
  const { isLoading, isSuccess, data } = useAllCrowdsaleSchedulesQuery();
  const slickRef = useRef(null);
  const [currentSlideIndex, setCurrentSlide] = useState(0);
  const next = () => {
    slickRef.current.next();
    //setCurrentSlide((s) => s + 1);
  };
  const prev = () => {
    slickRef.current.prev();
    //setCurrentSlide((s) => s - 1);
  };
  const handleSetCurrentSlideIndex = useCallback((index) => {
    setCurrentSlide(index);
  }, []);
  useEffect(() => {
    if (isLoading || !data || !data.isSuccess) return;
    let idx = data.data.findIndex((x) => x.isActive);
    if (idx > -1) setCurrentSlide(idx);
  }, [isLoading, isSuccess]);
  return (
    <div id="crowdsale-schedule">
      <div xs={24} sm={24} className="page-header">
        <div className="heading">
          <div className="icon-wrapper">
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.31216 11.0166L4.45591 17.6254C4.93378 18.3425 5.74427 18.7666 6.60591 18.7504H14.1434C15.0051 18.7666 15.8155 18.3425 16.2934 17.6254L19.4372 11.0116C19.8588 10.3583 19.8588 9.51864 19.4372 8.86536L16.3109 2.36536C15.8327 1.65556 15.0279 1.23596 14.1722 1.25036H10.3734H6.57466C5.71895 1.23596 4.91407 1.65556 4.43591 2.36536L1.31716 8.87536C0.896097 9.52648 0.894143 10.3635 1.31216 11.0166Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="header-title">{t("crowdsaleSchedule")}</h1>
        </div>
        <div className="carousel-nav">
          <button className="prev btn-link" onClick={prev}>
            <Icon name="FaChevronLeft" />
          </button>
          <button className="next btn-link" onClick={next}>
            <Icon name="FaChevronRight" />
          </button>
        </div>
      </div>
      <div className={`content-wrapper ${isLoading || !data ? "center" : ""}`}>
        {isLoading || !data ? (
          <Spin />
        ) : (
          <>
            <TimeLine items={data?.data} current={currentSlideIndex} />
            <Carousel
              ref={slickRef}
              items={data?.data}
              current={currentSlideIndex}
              setCurrentSlideIndex={handleSetCurrentSlideIndex}
            />
          </>
        )}
      </div>
    </div>
  );
};
export default CrowdsaleSchedule;

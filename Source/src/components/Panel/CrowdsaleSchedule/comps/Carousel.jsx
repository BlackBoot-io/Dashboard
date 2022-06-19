import { useTranslation } from "react-i18next";
import { Col, Carousel as AntdCarousel } from "antd";
import { forwardRef, useEffect } from "react";
const Carousel = forwardRef(({ items,current,setCurrentSlideIndex }, ref) => {
  const { t, i18n } = useTranslation();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    className: "center",
    centerMode: true,
    swipeToSlide: true,
    afterChange: function(index) {
      setCurrentSlideIndex(index);
    }
  };

  return (
    <Col id="carousel" xs={20} sm={20}>
      <div className="carousel-wrapper">
        <AntdCarousel ref={ref} {...settings} initialSlide={current}>
          {items?.map((x, idx) => {
            let from = new Date(x.from);
            let fromYear = from.getFullYear();
            let to = new Date(x.to);
            let toYear = from.getFullYear();
            return (
              <div key={idx} className="item">
                <span className="period">
                  {Math.floor(Math.abs(x.periodDay / 30))} {t("months")}
                </span>
                <div className="time-line">
                  <span className="dot"></span>
                </div>
                <span className="date-range">
                  {`${from.toLocaleString(i18n.language, { month: "long" })} ${
                    fromYear === toYear ? "" : fromYear + " "
                  }-  ${to.toLocaleString(i18n.language, {
                    month: "long",
                  })} ${toYear}`}
                </span>
                <p className="description">{x.description}</p>
              </div>
            );
          })}
        </AntdCarousel>
      </div>
    </Col>
  );
});
export default Carousel;

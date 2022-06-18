import { useTranslation } from "react-i18next";
import { Col, Carousel as AntdCarousel } from "antd";
const Carousel = ({ items }) => {
  const { t, i18n } = useTranslation();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };
  return (
    <Col id="carousel" xs={20} sm={20}>
      <AntdCarousel {...settings}>
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
              <span>
                {`${from.toLocaleString(i18n.language, { month: "long" })} ${
                  fromYear === toYear ? "" : fromYear + " "
                }-  ${to.toLocaleString(i18n.language, {
                  month: "long",
                })} ${toYear}`}
              </span>
              <p>{x.description}</p>
            </div>
          );
        })}
      </AntdCarousel>
    </Col>
  );
};
export default Carousel;

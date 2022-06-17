import { useTranslation } from "react-i18next";
import { Col, Carousel as AntdCarousel } from "antd";
const Carousel = ({ items }) => {
  const { t } = useTranslation();
  return (
    <Col id="carousel">
      <AntdCarousel>
        {items?.map((x, idx) => {
          return <div key={idx} className="item"></div>;
        })}
      </AntdCarousel>
    </Col>
  );
};
export default Carousel;

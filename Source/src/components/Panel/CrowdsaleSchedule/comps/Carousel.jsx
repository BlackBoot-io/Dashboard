import { useTranslation } from "react-i18next";
import {Col,Carousel as AntdCarousel} from "antd";
const Carousel = ({items}) => {
const { t } = useTranslation();
return <Col id="carousel">
    <AntdCarousel
    />
</Col>;
};
export default Carousel;
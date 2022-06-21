import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import Icon from "components/comps/Icon";
import SlideImage from "assets/images/auth-slide.png";

const Auth = () => {
  const { t } = useTranslation();
  const socials = [
    {
      title: t("instagram"),
      url: "http://www.blockino.ir",
      icon: "FaInstagram",
    },
    {
      title: t("twitter"),
      url: "http://www.blockino.ir",
      icon: "FaTwitter",
    },
    {
      title: t("telegram"),
      url: "http://www.blockino.ir",
      icon: "FaTelegramPlane",
    },
    {
      title: t("telegram"),
      url: "http://www.blockino.ir",
      icon: "FaGithub",
    },
    {
      title: t("discourd"),
      url: "http://www.blockino.ir",
      icon: "FaDiscord",
    },
  ];
  return (
    <div id="auth">
      <div className="card">
        <Row>
          <Col xs={0} sm={12} className="slide">
            <div className="top-section">
              <h1>{t("authMotto")}</h1>
              <ul className="socials">
                {socials.map((x, idx) => (
                  <li key={idx}>
                    <a href={x.url} target="_blank">
                      {" "}
                      <Icon name={x.icon} size={20} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <img
              className="slide-image"
              src={SlideImage}
              alt={t("authMotto")}
            />
          </Col>
          <Col xs={24} sm={12} className="content">
            <Outlet />
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default Auth;

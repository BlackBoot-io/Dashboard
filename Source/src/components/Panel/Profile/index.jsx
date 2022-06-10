import { Col, Row, Tabs } from "antd";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import Icon from "components/comps/Icon";
import SlideImage from "assets/images/auth-slide.svg";
import UpdateProfile from "./comps/UpdateProfile";
import ChangePassword from "./comps/ChangePassword";
import UpdateWallet from "./comps/UpdateWallet";

const Profile = () => {
    const { t } = useTranslation();

    return (
        <div id="profile">
            <Row>
                <Col xs={0} sm={12} className="slide">
                    <div className="top-section">
                        <h1>{t("profile")}</h1>
                    </div>
                    <img
                        className="slide-image"
                        src={SlideImage}
                        alt={t("profile")}
                    />
                </Col>
            </Row>
            <Row>
                <Tabs defaultActiveKey="1" centered>
                    <Tabs.TabPane tab={t("updateProfile")} key="1">
                        <UpdateProfile />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={t("changePassword")} disabled key="2">
                        <ChangePassword />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={t("updateWallet")} disabled key="2">
                        <UpdateWallet />
                    </Tabs.TabPane>
                </Tabs>
                <Col xs={24} sm={12} className="content">
                    <Outlet />
                </Col>
            </Row>
        </div>
    );
};
export default Profile;

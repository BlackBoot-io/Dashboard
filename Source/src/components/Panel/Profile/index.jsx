import { Col, Row, Tabs } from "antd";
import { useTranslation } from "react-i18next";
import SlideImage from "assets/images/auth-slide.svg";
import UpdateProfile from "./comps/UpdateProfile";
import ChangePassword from "./comps/ChangePassword";
import UpdateWallet from "./comps/UpdateWallet";

const Profile = () => {
    const { t } = useTranslation();

    return (
        <div id="profile">
            <Row>
                <Col xs={24} sm={6} className="profile-title">
                    <img alt={t("profile")} />
                    <h1>{t("profile")}</h1>
                </Col>
            </Row>
            <Row>
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab={t("updateProfile")} key="1">
                        <UpdateProfile />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={t("changePassword")} key="2">
                        <ChangePassword />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={t("updateWallet")} key="3">
                        <UpdateWallet />
                    </Tabs.TabPane>
                </Tabs>
            </Row>
        </div>
    );
};
export default Profile;

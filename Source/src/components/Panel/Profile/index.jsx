import { Col, Row, Tabs } from "antd";
import { useTranslation } from "react-i18next";
import SlideImage from "assets/images/auth-slide.svg";
import UpdateProfile from "./comps/UpdateProfile";
import ChangePassword from "./comps/ChangePassword";
import UpdateWallet from "./comps/UpdateWallet";
import { useGetCurrentUserInfoQuery } from "api/account";

const Profile = () => {
    const { t } = useTranslation();
    const { data } = useGetCurrentUserInfoQuery();

    return (
        <div id="profile">
            <Row>
                <Col xs={24} sm={6} className="profile-title">
                    <img alt={t("profile")} />
                    <h1>{t("profile")}</h1>
                </Col>
            </Row>
            <Row>
                <Tabs tabBarGutter={90} tabBarStyle={{ marginBottom: '28px', borderBottom: '1px solid #E8E5E5' }} defaultActiveKey="1">
                    <Tabs.TabPane tab={t("updateProfile")} key="1">
                        <UpdateProfile data={data}/>
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

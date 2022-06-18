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
          <div className="profile-title-image">
            <svg
              width="31"
              height="31"
              viewBox="0 0 31 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.6994 18.0835H12.3005C10.4171 18.177 8.74859 19.3274 7.99146 21.0543C7.07825 22.8472 8.90079 24.5418 11.0204 24.5418H19.9794C22.1003 24.5418 23.9229 22.8472 23.0084 21.0543C22.2512 19.3274 20.5827 18.177 18.6994 18.0835Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.3749 10.3335C19.3749 12.4736 17.64 14.2085 15.4999 14.2085C13.3598 14.2085 11.6249 12.4736 11.6249 10.3335C11.6249 8.19339 13.3598 6.4585 15.4999 6.4585C16.5276 6.4585 17.5132 6.86675 18.2399 7.59346C18.9666 8.32016 19.3749 9.30578 19.3749 10.3335Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="profile-title-text">{t("profile")}</div>
        </Col>
      </Row>
      <Row>
        <Tabs
          tabBarGutter={90}
          tabBarStyle={{
            marginBottom: "28px",
            borderBottom: "1px solid #E8E5E5",
          }}
          defaultActiveKey="1"
        >
          <Tabs.TabPane tab={t("personalData")} key="1">
            <UpdateProfile data={data} />
          </Tabs.TabPane>
          <Tabs.TabPane tab={t("managePassword")} key="2">
            <ChangePassword />
          </Tabs.TabPane>
          <Tabs.TabPane tab={t("walletAddress")} key="3">
            <UpdateWallet />
          </Tabs.TabPane>
        </Tabs>
      </Row>
    </div>
  );
};
export default Profile;

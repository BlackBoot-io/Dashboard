import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import WithdrawNotices from "./comps/Notices";
import WithdrawHeader from "./comps/Header";
import WithdrawForm from "./comps/Form";
import WithdrawTokenIcon from "assets/images/withdraw-token.svg";

const WithdrawToken = () => {
    const { t } = useTranslation();
    return (
        <div id="withdraw-token">
            <Row gutter={[24, 16]}>
                <Col xs={24} md={24} lg={24} className="withdraw-header">
                    <span className="logo-holder">
                        <img src={WithdrawTokenIcon} alt="logo" />
                    </span>
                    <h1 className="header-title">{t("withdrawToken")}</h1>
                </Col>
                <WithdrawForm />
                <WithdrawNotices />
            </Row>
        </div> 
    );
};
export default WithdrawToken;

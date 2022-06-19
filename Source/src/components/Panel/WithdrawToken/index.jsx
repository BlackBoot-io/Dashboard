import { Col, Row } from "antd"; 
import WithdrawNotices from "./comps/withdrawNotices";
import WithdrawHeader from "./comps/withdrawHeader";
import WithdrawForm from "./comps/withdrawForm";

const WithdrawToken = () => { 
    return (
        <div id="withdraw-token">
            <Row gutter={[24, 16]}>
                <Col xs={24} md={24} lg={24} className="withdraw-header">
                    <WithdrawHeader />
                </Col>
                <Col xs={24} md={24} lg={15}>
                    <WithdrawForm />
                </Col>
                <Col xs={24} md={24} lg={9}>
                    <WithdrawNotices />
                </Col>
            </Row>
        </div>
    );
};
export default WithdrawToken;

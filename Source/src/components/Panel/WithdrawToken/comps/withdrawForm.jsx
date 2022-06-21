import { useState } from "react";
import { useDispatch } from "react-redux";
import { Col, Row, Card, Form, Segmented, Input, Alert } from "antd";
import { useTranslation } from "react-i18next";
import EtheriumIcon from "assets/images/networks/etherium.svg";
import { networkTypes } from "../../../../config/enums";
import { useGetCurrentUserInfoQuery } from "../../../../api/account";
import Button from "../../../comps/Button";
import { useEffect } from "react";

const WithdrawForm = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [errorMsg, setErrorMsg] = useState("");
    const [selectedNetwork, setSelectedNetwork] = useState(networkTypes.Ethereum)
    const { data, isSuccess, isError } = useGetCurrentUserInfoQuery();
    const onFinish = () => { }
    const onFinishFailed = () => { }
    debugger;
    const onFill = () => {
        form.setFieldsValue({
            address: data?.data?.walletAddress,
        });
    };

    useEffect(() => {
        onFill()
    }, [])
    return (
        <Card style={{ width: '100%' }} className="withdraw-card">
            <p className="withdraw-network">
                Withdraw via network
            </p>
            <Segmented
                block
                options={[
                    {
                        label: (
                            <img src={EtheriumIcon} alt="EtheriumIcon" onClick={() => setSelectedNetwork(networkTypes.Ethereum)} />
                        ),
                        value: 'etherium',
                    },
                ]}
            />
            <Form
                name="withdrawTokenForm"
                initialValues={{ address: data?.data.walletAddress }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
            >
                <Row gutter={[24, 16]} >
                    <Col xs={24} md={24} lg={24} style={{ marginBottom: '40px' }}>
                        <Form.Item
                            name="address"
                            label={`${t("walleteAddress")}:`} >
                            <Input className="ant-input-holder" />
                        </Form.Item>
                    </Col>
                    {
                        //(data?.data?.walletAddress == null) ?
                            <Col xs={24} md={24} lg={24} style={{ marginTop: 20 }}>
                                <Alert message="You do not have wallete address" />
                            </Col>
                            // :
                            //<Col xs={24} md={24} lg={24}>
                            //    <div className="withdraw-amount-holder">
                            //        <p className="withdraw-amount"> Available withdrawal amount:<span className="withdraw-maxamount">{`${"1,254"}`}</span>AVN </p>
                            //        <button className="withdraw-btn-max">Max</button>
                            //    </div>
                            //    <Form.Item
                            //        name="amount"
                            //        label={`${t("withdrawalAmount")}:`} >


                            //        <Input className="ant-input" addonAfter={<span>AVN</span>} />
                            //    </Form.Item>
                            //</Col>
                    }
                    <Col xs={24} md={24} lg={24}>
                        <Button disabled={(data?.data?.walletAddress == null) ? false : true} className="btn-primary w-100 buy-button" htmlType="submit">
                            {t("Withdraw")}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
};
export default WithdrawForm;

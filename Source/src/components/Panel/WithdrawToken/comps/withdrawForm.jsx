import { useState } from "react";
import { Col, Row, Card, Form, Segmented, Input, Alert } from "antd";
import { useTranslation } from "react-i18next";
import { useGetCurrentUserInfoQuery } from "api/account";
import { useAddMutation, useGetUserBalanceQuery } from "api/transaction";
import utils from 'config/utils'
import { networkTypes, TransactionTypes } from "config/enums";
import Button from "../../../comps/Button";
import EtheriumIcon from "assets/images/networks/etherium.svg";

const WithdrawForm = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [errorMsg, setErrorMsg] = useState("");
    const [selectedNetwork, setSelectedNetwork] = useState(networkTypes.Ethereum)
    const currentUser = useGetCurrentUserInfoQuery();
    debugger;
    const [skip, setSkip] = useState(true)
    const [
        add,
        { isLoading, isSuccess, error, isError },
    ] = useAddMutation();
    const userBalance = useGetUserBalanceQuery();
    const onFinish = () => { }
    const onFinishFailed = () => { }

    const onClickSetMax = (value) => {
        form.setFieldsValue({
            amount: value,
        });
    };

    const handleSubmit = async (value) => {
        debugger;
        setErrorMsg("");
        var data = {
            Network: selectedNetwork,
            TokenCount: value.amount,
            Type: TransactionTypes.Withdraw
        }
        const call = await add(data).unwrap();
        console.log("after call", call.data);
        if (!call.isSuccess) {
            setErrorMsg(t("wrongUsernameOrPassword"));
            return;
        }
        alert("Succesful")
    };
    const invalid = () => { };
    return (
        <Card style={{ width: '100%' }} className="withdraw-card">
            <p className="withdraw-network">
                Withdraw via network
            </p>
            <Segmented
                options={[
                    {
                        icon: (
                            <img src={EtheriumIcon} alt="EtheriumIcon" onClick={() => setSelectedNetwork(networkTypes.Ethereum)} />
                        ),
                        value: 'etherium',
                    }
                ]}
            />
            <Form
                form={form}
                name="withdrawTokenForm"
                initialValues={{ address: currentUser.data.data.walletAddress }}
                onFinish={handleSubmit}
                onFinishFailed={invalid}
                layout="vertical"
            >
                <Row gutter={[24, 16]} >
                    {
                        (currentUser.data.data.walletAddress==null) ?
                            <Col xs={24} md={24} lg={24} style={{ marginTop: 20 }}>
                                <Alert message="You do not have wallete address" />
                            </Col>
                            :
                            <Col xs={24} md={24} lg={24} style={{ marginBottom: '40px' }}>
                                <Form.Item
                                    name="address"
                                    label={`${t("walleteAddress")}:`} >
                                    <Input className="ant-input-holder" />
                                </Form.Item>
                            </Col>
                    }

                    <Col xs={24} md={24} lg={24}>
                        <div className="withdraw-amount-holder">
                            <p className="withdraw-amount"> Available withdrawal amount:<span className="withdraw-maxamount">{utils.commaThousondSeperator(userBalance.data?.data)}</span>AVN </p>
                            <button className="withdraw-btn-max" onClick={() => onClickSetMax(userBalance.data?.data)}>Max</button>
                        </div>
                        <Form.Item
                            name="amount"
                            label={`${t("withdrawalAmount")}:`} >
                            <Input className="ant-input-holder" rules={[{ required: true }, { type: 'number', max: userBalance.data?.data }]} />
                        </Form.Item>
                        <div className="withdraw-amount-holder">
                            <p className="withdraw-amount"> Withdrrawal fees : <span >{utils.commaThousondSeperator(userBalance.data?.data)}</span> USDT </p>
                        </div>
                    </Col>

                    <Col xs={24} md={24} lg={24}>
                        <Form.Item className="mb-1">
                            <Button  className="btn-primary w-100 buy-button" type="submit" loading={isLoading}>
                                {t("Withdraw")}
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Card >
    );
};
export default WithdrawForm;

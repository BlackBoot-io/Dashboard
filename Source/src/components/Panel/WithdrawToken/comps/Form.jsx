import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Card, Form, Segmented, Input, Alert, message } from "antd";
import { useTranslation } from "react-i18next";
import { useGetCurrentUserInfoQuery } from "api/account";
import { useAddMutation, useGetUserBalanceQuery } from "api/transaction";
import utils from 'config/utils'
import { networkTypes, transactionTypes } from "config/enums";
import Button from "../../../comps/Button";
import EtheriumIcon from "assets/images/networks/etherium.svg";
import routes from "../../../../config/routes";

const WithdrawForm = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [errorMsg, setErrorMsg] = useState("");
    const [selectedNetwork, setSelectedNetwork] = useState(networkTypes.Ethereum)
    const currentUser = useGetCurrentUserInfoQuery();
    const [add, { isLoading, isSuccess, error, isError }] = useAddMutation();
    const userBalance = useGetUserBalanceQuery();

    const validateMessages = {
        required: 'input is required!',
    };
    const onClickSetMax = (value) => {
        form.setFieldsValue({
            amount: value,
        });
    };
    const handleSubmit = async (value) => {
        var data = {
            Network: selectedNetwork,
            TokenCount: value.amount,
            Type: transactionTypes.Withdraw
        }
        const call = await add(data).unwrap();
        console.log("after call", call.data);
        if (!call.isSuccess) {
            message.destroy();
            message.warning(call.message);
            return;
        }
        message.destroy();
        message.success("opration successfully.");
    };
    return (
        <Col xs={24} xl={16} xxl={16} id="withdraw-form">
            <div style={{ width: '100%' }} className="custom-card withdraw-card">
                <p className="withdraw-p">
                    Withdraw via network
                </p>
                <Form
                    validateMessages={validateMessages}
                    form={form}
                    name="withdrawTokenForm"
                    initialValues={{ address: currentUser.data.data.walletAddress }}
                    layout="vertical" >
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

                    {
                        (currentUser.data.data.walletAddress == null) ?
                            <Col xs={24} md={24} lg={24} style={{ marginTop: "33px", padding: 0 }}>
                                <Alert action={
                                    <Button size="small" type="text" className="btn-profile" onClick={() => navigate(`/${routes.profile}`)} >
                                        Update Profile
                                    </Button>
                                } message="You do not have wallete address for withdrawing update your profile" />
                            </Col>
                            :
                            <Col xs={24} md={24} lg={24} style={{ marginTop: "33px", padding: 0 }}>
                                <label className="custom-label">{`${t("walleteAddress")}`}</label>
                                <Form.Item name="address">
                                    <Input className="custom-input" disabled />
                                </Form.Item>
                            </Col>

                    }

                    <Col xs={24} md={24} lg={24} style={{ marginTop: "42px", padding: 0 }}>
                        <div className="withdraw-amount-holder">
                            <p className="withdraw-amount"> Available withdrawal amount:<span className="withdraw-maxamount">{utils.commaThousondSeperator(userBalance.data?.data)}</span>AVN </p>
                            <button className="withdraw-btn-max" onClick={() => onClickSetMax(userBalance.data?.data)}>Max</button>
                        </div>
                        <Form.Item name="amount"
                            label={`${t("withdrawalAmount")}:`}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input amount!'
                                }]} >
                            <Input className="custom-input" />
                        </Form.Item>
                        <div className="withdraw-amount-holder">
                            <p className="withdraw-amount"> Withdrrawal fees : <span >{utils.commaThousondSeperator(userBalance.data?.data)}</span> USDT </p>
                        </div>
                    </Col>

                    <Col xs={24} md={24} lg={24} style={{ padding: 0 }}>
                        <Form.Item className="mb-1">
                            <Button className="btn-primary w-100 buy-button" style={{ marginTop: "60px", padding: 0 }} type="submit" loading={isLoading}>
                                {t("Withdraw")}
                            </Button>
                        </Form.Item>
                    </Col>
                </Form>
            </div >
        </Col>
    );
};
export default WithdrawForm;

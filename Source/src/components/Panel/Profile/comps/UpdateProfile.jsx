import { Alert, Col, DatePicker, Form, Input, Row, Select, Space } from "antd";
import { Option } from "antd/lib/mentions";
import { useUpdateProfileMutation } from "api/account";
import Button from "components/comps/Button";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const UpdateProfile = ({data}) => {
    const [form] = Form.useForm();
    const { t } = useTranslation();
    const [nations, setNations] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");

    const dispatch = useDispatch();
    const [updateProfile, { isLoading, error, isError }] = useUpdateProfileMutation();

    const handleSubmit = async (values) => {
        setErrorMsg("");
        const call = await updateProfile(values).unwrap();
        if (!call.isSuccess) {
            setErrorMsg(call.message);
            return;
        }
    };

    useEffect(() => {
        fetch("https://restcountries.com/v2/all")
            .then(res => res.json())
            .then(countries => {
                const countryNames = countries.map(c => c.name);
                setNations(countryNames);
            });
    }, [])

    return <div id="update-profile">
        <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
        >
            <Row gutter={[24, 16]} style={{ marginBottom: '20px' }}>
                <Col xs={8}>
                    <Form.Item label={t("name")} className="input-label">
                        <Input className="custom-input" />
                    </Form.Item>
                </Col>
                <Col xs={8}>
                    <Form.Item label={t("email")} className="input-label">
                        <Input className="custom-input" />
                    </Form.Item>
                </Col>
                <Col xs={8}>
                    <Form.Item label={t("birthdayDate")} className="input-label">
                        <DatePicker />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[24, 16]} style={{ marginBottom: '28px' }}>
                <Col xs={8}>
                    <Form.Item label={t("gender")} className="input-label">
                        <Select>
                            <Select.Option value={1}>Male</Select.Option>
                            <Select.Option value={0}>Female</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={8}>
                    <Form.Item label={t("nationality")} className="input-label">
                        <Select>
                            {nations.map(nation => <Select.Option value={nation}>{nation}</Select.Option>)}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Form.Item>
                    <Button
                        className="btn-primary w-100 update-profile-button"
                        type="submit"
                        loading={isLoading}
                        style={{ width: '169px', height: '48px' }}
                    >
                        {t("updateProfile")}
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    </div>;
};

export default UpdateProfile;

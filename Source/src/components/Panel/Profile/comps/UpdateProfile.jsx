import { Alert, Col, Form, Input, Row, Select, Space } from "antd";
import { Option } from "antd/lib/mentions";
import { useUpdateProfileMutation } from "api/account";
import Button from "components/comps/Button";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const UpdateProfile = () => {
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
        <Row gutter={[24, 16]} style={{ marginBottom: '20px' }}>
            <Col xs={8}>
                <label className="input-label">
                    {t("name")}
                </label>
                <Input className="custom-input" />
            </Col>
            <Col xs={8}>
                <label className="input-label">
                    {t("email")}
                </label>
                <Input className="custom-input" />
            </Col>
            <Col xs={8}>
                <label className="input-label">
                    {t("birthdayDate")}
                </label>
                <Input className="custom-input" />
            </Col>
        </Row>
        <Row gutter={[24, 16]} style={{ marginBottom: '28px' }}>
            <Col xs={8}>
                <label className="input-label">{t("gender")}</label>
                <Select
                    allowClear
                >
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                </Select>
            </Col>
            <Col xs={8}>
                <label className="input-label">{t("nationality")}</label>
                <Select
                    allowClear
                >
                    {nations.map(nation => <Option value="male">{nation}</Option>)}
                </Select>
            </Col>
        </Row>
        <Row>
            <Button
                className="btn-primary w-100 update-profile-button"
                type="submit"
                loading={isLoading}
                style={{ width: '169px', height: '48px' }}
            >
                {t("updateProfile")}
            </Button>
        </Row>
    </div>;
};

export default UpdateProfile;

import { Alert, Form, Input, Select, Space } from "antd";
import { Option } from "antd/lib/mentions";
import { useUpdateProfileMutation } from "api/account";
import Button from "components/comps/Button";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const UpdateProfile = () => {
    const { t } = useTranslation();
    const [nations, setNations] = useState();
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
            name="update-profile-form"
            layout="vertical"
            onFinish={handleSubmit}
            autoComplete="off"
            size="large"
        >
            <Space direction="vertical" size={10} className="w-100">
                {errorMsg || isError ? (
                    <Alert message={errorMsg ?? t("unknownError")} type="error" />
                ) : null}
                <Form.Item
                    label={t("name")}
                    name="name"
                    rules={[{ required: true, message: t("required") }]}
                >
                    <Input className="ltr-input" />
                </Form.Item>
                <Form.Item
                    className="mb-0"
                    label={t("email")}
                    name="email"
                    rules={[{ required: true, message: t("required") }]}
                >
                    <Input className="ltr-input" />
                </Form.Item>
                <Form.Item
                    className="mb-0"
                    label={t("birthdayDate")}
                    name="birthdayDate"
                    rules={[{ required: true, message: t("required") }]}
                >
                    <Input className="ltr-input" />
                </Form.Item>
                <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
                    <Select
                        placeholder="Select a option and change input text above"
                        allowClear
                    >
                        <Option value="male">male</Option>
                        <Option value="female">female</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="nationality" label="Nationality" rules={[{ required: true }]}>
                    <Select
                        placeholder="Select a option and change input text above"
                        allowClear
                    >
                        {nations.map(nation => <Option value="male">{nation}</Option>)}
                    </Select>
                </Form.Item>
                <Form.Item className="mb-1">
                    <Button
                        className="w-100 btn-primary"
                        type="submit"
                        loading={isLoading}
                    >
                        {t("updateProfile")}
                    </Button>
                </Form.Item>
            </Space>
        </Form>
    </div>;
};

export default UpdateProfile;

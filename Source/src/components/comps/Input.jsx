import { useTranslation } from "react-i18next";
import { Input } from "antd";
const Input = (props) => {
  const { t } = useTranslation();
  return <Input className="custom-input" {...props} />;
};
export default Input;

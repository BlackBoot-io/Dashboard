import { Alert } from "antd";
const CustomAlert = ({ type, message, ...props }) => {
  return <Alert message={message} type={type??"error"} showIcon {...props} />;
};
export default CustomAlert;

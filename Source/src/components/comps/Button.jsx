import { Button as AntBtn } from "antd";
import PropTypes from "prop-types";
const Button = ({ className, loading, children, onClick, ...props }) => {
  return (
    <AntBtn
      className={className ?? ""}
      disabled={loading}
      onClick={onClick}
      loading={loading}
      htmlType="submit"
      {...props}
    >
      {children}
    </AntBtn>
  );
};
Button.propTypes = {
  onClick: PropTypes.func,
};
export default Button;

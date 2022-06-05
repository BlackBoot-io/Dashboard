import { Spin } from "antd";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
const Button = ({ className, loading, children, onClick, ...props }) => {
  const { t } = useTranslation();
  return (
    <button
      className={className ?? ""}
      disabled={loading}
      onClick={onClick}
      {...props}
    >
      {children}
      {loading ? <Spin size="small" /> : null}
    </button>
  );
};
Button.propTypes = {
  onClick: PropTypes.func,
};
export default Button;

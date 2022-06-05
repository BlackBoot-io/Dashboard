import * as FaIcons from "react-icons/fa";
import PropTypes from "prop-types";
const Icon = ({ name, ...props }) => {
  const FoundIcon = FaIcons[name];
  return FoundIcon ? <FoundIcon {...props} /> : null;
};
Icon.propTypes = {
  name: PropTypes.string.isRequired,
};
export default Icon;

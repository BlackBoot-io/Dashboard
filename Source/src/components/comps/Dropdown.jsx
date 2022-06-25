import { Select } from "antd";
const Dropdown = ({ onChange, placeHolder, defaultValue, children }) => {
  return (
    <div className="custom-select">
      <Select
        onChange={(value) => onChange(value, "network")}
        placeholder={placeHolder}
        // allowClear={true}
        defaultValue={defaultValue}
      >
        {children}
      </Select>
    </div>
  );
};

export default Dropdown;

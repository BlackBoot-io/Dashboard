import { Select } from "antd";
const Dropdown = (props) => {
  return (
    <>
      <Select className="custom-select" {...props}>
        {props.children}
      </Select>
    </>
  );
};

export default Dropdown;

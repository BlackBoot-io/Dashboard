import { Modal as Dialog } from "antd";

const Modal = (props) => {
  debugger;
  const classNames = "custom-modal " + props.className;
  return (
    <>
      <Dialog {...props} className={classNames}>
        {props.children}
      </Dialog>
    </>
  );
};

export default Modal;

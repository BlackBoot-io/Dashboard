import { useRef } from "react";
import { Col, Row, Modal, Input } from "antd";
import { useTranslation } from "react-i18next";
import Icon from "components/comps/Icon";
import DangerTriangleIcon from "assets/images/danger-triangle.svg";
import EthereumIcon from "assets/images/networks/etheriumIcon.svg";
import CopyIcon from "assets/images/copy.svg";
import qrCode from "assets/images/QR.svg";

const ConfirmModal = (props) => {
  const { t } = useTranslation();
  const nameRef = useRef();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(nameRef.current.input.value);
  };

  return (
    <>
    {props.content ? 
      <Modal
        title="Contribution confirmation"
        visible={props.modalVisibility}
        footer={null}
        centered
        closable={true}
        mask={true}
        maskClosable={true}
        className="buy-modal"
        onCancel={props.onClose}
        id="buy-modal"
      >
        <Row>
          <Row>
            <Col xs={24} sm={12}>
              <h3 className="buy-title">{t("transactionId")}</h3>
            </Col>
            <Col xs={24} sm={12}>
              <p className="buy-text">{props.content.transactionId}</p>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={12}>
              <h3 className="buy-title">{t("finalTransfarableValue")}</h3>
            </Col>
            <Col xs={24} sm={12} className="final-transfarable" style={{textAlign: 'right'}}>
              <span className="dollar-amount">${props.content.usdtAmount}</span><span className="almost-eq">≃</span><span className="token-amount">{props.content.cryptoAmount}</span><span><img src={EthereumIcon} alt="ethereumIcon" /></span>
            </Col>
          </Row>
        </Row>
        <div className="buy-modal-divider">
          <div className="divider-icon">
            <Icon name={"FaChevronDown"} />
          </div>
        </div>
          <Row>
            <Col xs={24} sm={24}>
              <h3 className="buy-title" style={{marginBottom: 0}}>{t("toWalletAddress")}:</h3>
            </Col>
            <Col xs={24} sm={24}>
              <p className="buy-p">Your deposit will be transfered to the wallete address below.</p>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={3}>
              <span className="qrcode">
                <img src={qrCode} alt="QR Code" />
              </span>
            </Col>
            <Col xs={12} sm={21} style={{ marginTop: 15 }}>
              <Input className="custom-input" ref={nameRef} value={props.content.walletAddress} addonAfter={<img src={CopyIcon} style={{ width:'12px', cursor: 'pointer' }} alt="copy" onClick={copyToClipboard} />} />
            </Col>
          </Row>
          <Row style={{ marginTop: 15 }}>
            <Col xs={12} sm={12}>
              <h3 className="buy-title" style={{marginBottom: 0}}>{t("timeLeft")}</h3>
            </Col>
            <Col xs={12} sm={12}>
              <p className="buy-text">07 : 59 : 59</p>
            </Col>
            <Col xs={24} sm={24}>
              <p className="buy-p" style={{color: '#d84423', marginTop: 20}}>
                <img
                  src={DangerTriangleIcon}
                  style={{ marginRight: 5 }}
                  alt="danger icon"
                />
                Your contribution token value will be transfered to the wallet address above authomatically after Email confirmation.
              </p>
            </Col>
          </Row>
      </Modal>
     : null}
    </>
  );
};

export default ConfirmModal;

import { Col, Row, Modal } from "antd";
import { useTranslation } from "react-i18next";
import Icon from "components/comps/Icon";

const Detail = (props) => {
  const { t } = useTranslation();

  console.log(props.data);
  return (
    <>
      <Modal
        title={t("TransactionDetail")}
        visible={props.modalVisibility}
        footer={null}
        centered
        closable={true}
        mask={true}
        maskClosable={true}
        className="transaction-modal"
        onCancel={props.onClose}
      >
        <Row>
          <Col xs={12} sm={8}>
            <label>{t("TransactionDate")}</label>
            <p>5 may 2022</p>
          </Col>
          <Col xs={12} sm={8}>
            <label>{t("TransactionStatus")}</label>
            <p>Pending</p>
          </Col>
          <Col xs={12} sm={8}>
            <label>{t("TransactionApproveNote")}</label>
            <p>-</p>
          </Col>
        </Row>
        <Row>
          <h3>{t("TransactionInfo")}</h3>
          <Row>
            <Col xs={12} sm={8}>
              <label>{t("TXID")}</label>
            </Col>
            <Col xs={12} sm={8}>
              <p>fsdfsdfsdfsd</p>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={8}>
              <label>{t("TransactionType")}</label>
            </Col>
            <Col xs={12} sm={8}>
              <p>Purchase</p>
            </Col>
          </Row>
        </Row>
        <div className="transaction-modal-divider">
          <Icon name={"FaAngleUp"} />
        </div>

        <Row>
          <h3>{t("TokenDetail")}</h3>
          <Row>
            <Col xs={12} sm={8}>
              <label>{t("StageName")}</label>
            </Col>
            <Col xs={12} sm={8}>
              <p>Public Sale</p>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={8}>
              <label>{t("Contribution")}</label>
            </Col>
            <Col xs={12} sm={8}>
              <p>0.00036</p>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={8}>
              <label>{t("TokenAddedTo")}</label>
            </Col>
            <Col xs={12} sm={8}>
              <p>xxxxxxxxxxxxxxxxxxxx</p>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={8}>
              <label>{t("RefferalCode")}</label>
            </Col>
            <Col xs={12} sm={8}>
              <p>12344</p>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={8}>
              <label>{t("Token")}</label>
            </Col>
            <Col xs={12} sm={8}>
              <p>12344</p>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={8}>
              <label>{t("BounesToken")}</label>
            </Col>
            <Col xs={12} sm={8}>
              <p>-</p>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={8}>
              <label>{t("TotalTokens")}</label>
            </Col>
            <Col xs={12} sm={8}>
              <p>12344</p>
            </Col>
          </Row>
        </Row>
      </Modal>
    </>
  );
};

export default Detail;

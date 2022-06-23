import { Col, Row, Modal } from "antd";
import { useTranslation } from "react-i18next";
import Icon from "components/comps/Icon";
import Utils from "config/utils";
import { transactionTypes, transactionStatusTypes } from "config/enums";

const Detail = (props) => {
  const { t } = useTranslation();

  const { data } = props;
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
          <Col xs={24} sm={10}>
            <h3 className="transaction-title">{t("TransactionDate")}</h3>
            <p className="transaction-text">{data.date}</p>
          </Col>
          <Col xs={24} sm={14}>
            <h3 className="transaction-title">{t("TransactionStatus")}</h3>
            <p className="transaction-text">
              {t(Utils.getKeyByValue(transactionStatusTypes, data.status))}
            </p>
          </Col>
        </Row>
        <Row>
          <h3 className="token-detail-title">{t("TransactionInfo")}</h3>
          <Row>
            <Col xs={24} sm={10}>
              <h3 className="transaction-title">{t("TXID")}</h3>
            </Col>
            <Col xs={24} sm={14}>
              <p className="transaction-text">{data.txId}</p>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={10}>
              <h3 className="transaction-title">{t("TransactionType")}</h3>
            </Col>
            <Col xs={24} sm={14}>
              <p className="transaction-text">
                {t(Utils.getKeyByValue(transactionTypes, data.type))}
              </p>
            </Col>
          </Row>
        </Row>
        <div className="transaction-modal-divider">
          <div className="divider-icon">
            <Icon name={"FaChevronDown"} />
          </div>
        </div>
        <Row>
          <h3 className="token-detail-title">{t("TokenDetail")}</h3>

          <Row>
            <Col xs={24} sm={10}>
              <h3 className="transaction-title">{t("StageName")}</h3>
            </Col>
            <Col xs={24} sm={14}>
              <p className="transaction-text">{data.crowdSaleSchedule.title}</p>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={10}>
              <h3 className="transaction-title">{t("Contribution")}</h3>
            </Col>
            <Col xs={24} sm={14}>
              <p className="transaction-text">{data.tokenCount}</p>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={10}>
              <h3 className="transaction-title">{t("TokenAddedTo")}</h3>
            </Col>
            <Col xs={24} sm={14}>
              <p className="transaction-text">{data.walletAddress}</p>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={10}>
              <h3 className="transaction-title">{t("BounesToken")}</h3>
            </Col>
            <Col xs={24} sm={14}>
              <p className="transaction-text">{data.bonusCount}</p>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={10}>
              <h3 className="transaction-title">{t("TotalTokens")}</h3>
            </Col>
            <Col xs={24} sm={14}>
              <p className="transaction-text">{data.totalToken}</p>
            </Col>
          </Row>
        </Row>
      </Modal>
    </>
  );
};

export default Detail;

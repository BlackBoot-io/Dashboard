import { Col, Row, Button, Select, Table, Modal } from "antd";
import { useTranslation } from "react-i18next";
import TransactionLogo from "assets/images/transaction.svg";
import Icon from "components/comps/Icon";
import { useEffect, useState } from "react";
import { useGetAllQuery } from "api/transaction";
import Utils from "config/utils";
const { Option } = Select;

const data3 = [];
for (let i = 0; i < 200; i++) {
  data3.push({
    transactionId: i,
    usdtAmount: 0.05,
    network: i % 2 == 0 ? 2 : 3,
    walletAdress: "xxxxxxxxxxxxxx",
    type: i % 2 == 0 ? 0 : 1,
    status: i % 2 == 0 ? 2 : 3,
    date: `22 may`,
  });
}

const Transaction = () => {
  const columns = [
    {
      title: () => t("Price"),
      dataIndex: "usdtAmount",
      render: (value) => <span>{value} USDT</span>,
    },
    {
      title: () => t("Network"),
      dataIndex: "network",
      render: (value) => (
        <span>
          <Icon
            name={"FaAtlassian"}
            style={{
              "margin-right": 2,
            }}
          />{" "}
          {value}
        </span>
      ),
    },
    {
      title: () => t("WalletAdress"),
      dataIndex: "walletAdress",
      render: (value) => (
        <div>
          {value}
          <Icon
            // style="cursor:pointer;"
            onClick={() => Utils.copyToClipboard(value)}
            name={"FaRegCopy"}
            style={{
              "margin-left": 2,
              cursor: "pointer",
            }}
          />
        </div>
      ),
    },
    {
      title: () => t("Type"),
      dataIndex: "type",
      render: (value) => (
        <span>
          <Icon
            name={"FaUpload"}
            style={{
              "margin-right": 2,
            }}
          />{" "}
          {value}
          {/* <Icon name={"FaDownload"} /> {value} */}
        </span>
      ),
    },
    {
      title: () => t("Status"),
      dataIndex: "status",
      render: (value) => <span>{value}</span>,
    },
    {
      title: () => t("Date"),
      dataIndex: "date",
      render: (value) => <span>{value}</span>,
    },
    {
      title: () => t("Actions"),
      dataIndex: "actions",
      render: (value) => (
        <span>
          <Icon
            onClick={openModal}
            name={"FaFolderPlus"}
            style={{
              "margin-right": 2,
              cursor: "pointer",
            }}
          />
          <Icon
            name={"FaFolderPlus"}
            style={{
              cursor: "pointer",
            }}
          />
        </span>
      ),
    },
  ];
  const { t } = useTranslation();
  const [filterToggle, setFilterToggle] = useState(false);
  const [pageSize, setPageSize] = useState(50);
  const [dataSource, setDataSource] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { data, isLoading, isSuccess, isError } = useGetAllQuery();

  const getTransactions = (network, status, type) => {
    debugger;
    let filterdData = data3.map((value) => {
      return {
        key: value.transactionId,
        ...value,
      };
    });
    if (network)
      filterdData = filterdData.filter((x) => x.network === parseInt(network));
    if (status)
      filterdData = filterdData.filter((x) => x.status === parseInt(status));
    if (type)
      filterdData = filterdData.filter((x) => x.type === parseInt(type));
    setDataSource(filterdData);
  };

  const handlePageSizeChange = (value) => {
    setPageSize(value);
  };
  const filterToggleChange = () => {
    setFilterToggle(!filterToggle);
  };
  const handleNetworkChange = (value) =>
    getTransactions(value, undefined, undefined);
  const handleTypeChange = (value) =>
    getTransactions(undefined, undefined, value);
  const handleStatusChange = (value) =>
    getTransactions(undefined, value, undefined);

  const openModal = () => {
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (isSuccess && data) {
      getTransactions();
    }
  }, [isSuccess, isError]);

  return (
    <div id="transaction">
      <Row>
        <Col xs={24} sm={6} className="transaction-header-logo">
          <img src={TransactionLogo} alt="logo" />
          <h1>{t("Transactions")} </h1>
        </Col>
        <Col xs={24} sm={18} className="transaction-header-action">
          <div className="transaction-header-action-pager">
            <h4>{t("ShowRows")}</h4>
            <Select
              defaultValue={5}
              onChange={handlePageSizeChange}
              style={{ width: 70 }}
            >
              <Option value="50">50</Option>
              <Option value="100">100</Option>
              <Option value="200">200</Option>
            </Select>
          </div>
          <Button
            icon={
              <Icon
                style={{
                  "margin-right": 5,
                }}
                name={"FaSlidersH"}
              />
            }
            onClick={filterToggleChange}
          >
            Filter
          </Button>
        </Col>
        {filterToggle ? (
          <Row className="transaction-header-action-filters">
            <Select
              onChange={handleNetworkChange}
              style={{ width: 100 }}
              placeholder={t("Network")}
            >
              <Option value="">All</Option>
              <Option value="1">Bitcoin</Option>
              <Option value="2">Ethereum</Option>
              <Option value="3">Solana</Option>
              <Option value="4">Tether</Option>
              <Option value="5">Binance</Option>
            </Select>
            <Select
              onChange={handleTypeChange}
              style={{ width: 100 }}
              placeholder={t("Type")}
            >
              <Option value="">All</Option>
              <Option value="0">Deposit</Option>
              <Option value="1">Withdraw</Option>
            </Select>
            <Select
              onChange={handleStatusChange}
              style={{ width: 100 }}
              placeholder={t("Status")}
            >
              <Option value="">All</Option>
              <Option value="1">Pending</Option>
              <Option value="2">TimedOut</Option>
              <Option value="3">RejectByUser</Option>
              <Option value="4">RejectByNetwork</Option>
              <Option value="5">ConfirmedByNetwork</Option>5
            </Select>
          </Row>
        ) : null}
      </Row>
      <Row className="transaction-table-container">
        <Table
          size="large"
          columns={columns}
          dataSource={dataSource}
          loading={isLoading}
          pagination={{ position: ["none"], pageSize: pageSize }}
          scroll={{ x: "100vh", y: "90vh" }}
        />
      </Row>
      <Modal
        title={t("TransactionDetail")}
        visible={isModalVisible}
        footer={null}
        centered
        closable={true}
        mask={true}
        maskClosable={true}
        className="transaction-modal"
        onCancel={closeModal}
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
    </div>
  );
};
export default Transaction;

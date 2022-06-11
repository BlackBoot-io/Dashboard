import Icon from "components/comps/Icon";
import { useTranslation } from "react-i18next";
import Utils from "config/utils";
import { Row, Table } from "antd";

const List = (props) => {
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
          />
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
          />
          {value}
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
            onClick={props.onOpenDetail}
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
  return (
    <>
      <Row className="transaction-table-container">
        <Table
          size="large"
          columns={columns}
          dataSource={props.data}
          loading={props.isLoading}
          pagination={{ position: ["none"], pageSize: props.pageSize }}
          scroll={{ x: "100vh", y: "90vh" }}
        />
      </Row>
    </>
  );
};
export default List;

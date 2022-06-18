import Icon from "components/comps/Icon";
import { useTranslation } from "react-i18next";
import Utils from "config/utils";
import { Row } from "antd";
import DataTable from "components/comps/DataTable";

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
              marginRight: 2,
            }}
          />
          {value}
        </span>
      ),
    },
    {
      title: () => t("WalletAddress"),
      dataIndex: "walletAddress",
      render: (value) => (
        <div>
          {value}
          <Icon
            onClick={() => Utils.copyToClipboard(value)}
            name={"FaRegCopy"}
            style={{
              marginLeft: 2,
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
              marginLeft: 2,
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
      dataIndex: "transactionId",
      render: (value) => (
        <span>
          <Icon
            onClick={() => props.onOpenDetail(value)}
            name={"FaFolderPlus"}
            style={{
              marginLeft: 2,
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
        <DataTable
          columns={columns}
          data={props.data}
          loading={props.loading}
          pageSize={props.pageSize}
        />
      </Row>
    </>
  );
};
export default List;

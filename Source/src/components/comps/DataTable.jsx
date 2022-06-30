import { Table } from "antd";
const DataTable = ({ columns, data, loading, pageSize, scroll, ...props }) => {
  return (
    <Table
      size="large"
      columns={columns}
      className="tbl-general"
      dataSource={data}
      loading={loading}
      pagination={{ position: ["none"], pageSize: pageSize }}
      scroll={{ x: "100vh", y: "0vh" }}
      // {...props}
    />
  );
};

export default DataTable;

import { Table } from "antd";
const DataTable = (props) => {
  return (
    <>
      <Table
        size="large"
        className="tbl-general"
        columns={props.columns}
        dataSource={props.data}
        loading={props.loading}
        pagination={{ position: ["none"], pageSize: props.pageSize }}
        scroll={{ x: "100vh" }}
      />
    </>
  );
};

export default DataTable;

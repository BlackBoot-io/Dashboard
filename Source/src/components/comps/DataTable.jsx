import { Table } from "antd";
const DataTable = (props) => {
  return (
    <>
      <Table
        size="large"
        columns={props.columns}
        dataSource={props.data}
        loading={props.loading}
        pagination={{ position: ["none"], pageSize: props.pageSize }}
        scroll={{ x: "100vh", y: "0vh" }}
      />
    </>
  );
};

export default DataTable;

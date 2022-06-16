import { useEffect, useState } from "react";
import { useGetAllQuery, useGetByIdQuery } from "api/transaction";

import Detail from "./comps/Detail";
import Filter from "./comps/Filter";
import List from "./comps/List";

const Transaction = () => {
  const [dataSource, setDataSource] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [pageSize, setPageSize] = useState(50);
  const [data, isSuccess, isError] = useGetAllQuery();

  const getTransactions = async (network, status, type) => {
    debugger;
    let filterdData = [].map((value) => {
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

  const handleNetworkChange = (value) =>
    getTransactions(value, undefined, undefined);
  const handleTypeChange = (value) =>
    getTransactions(undefined, undefined, value);
  const handleStatusChange = (value) =>
    getTransactions(undefined, value, undefined);

  const openDetailModal = () => {
    setModalVisibility(true);
  };
  const closeDetailModal = () => {
    setModalVisibility(false);
  };

  const handlePageSizeChange = (value) => {
    setPageSize(value);
  };

  useEffect(() => {
    console.log("transaction", data, isSuccess, isError);
    if (data && isSuccess) {
      getTransactions();
    }
  }, [data]);
  return (
    <div id="transaction">
      <Filter
        onPageSizeChange={handlePageSizeChange}
        onNetworkChange={handleNetworkChange}
        onTypeChange={handleTypeChange}
        onStatusChange={handleStatusChange}
      />
      <List
        data={dataSource}
        Loading={false}
        pageSize={pageSize}
        onOpenDetail={openDetailModal}
      />
      <Detail modalVisibility={modalVisibility} onClose={closeDetailModal} />
    </div>
  );
};
export default Transaction;

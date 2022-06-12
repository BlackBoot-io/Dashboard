import { useEffect, useState } from "react";
import { useGetAllQuery } from "api/transaction";

import Detail from "./comps/Detail";
import Filter from "./comps/Filter";
import List from "./comps/List";

const Transaction = () => {
  const data = [];
  const [dataSource, setDataSource] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [pageSize, setPageSize] = useState(50);

  const getTransactions = (network, status, type) => {
    debugger;
    let filterdData = data.map((value) => {
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
    // if (isSuccess && data) {
    getTransactions();
    // }
  }, []);
  // }, [isSuccess, isError]);

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
        isLoading={false}
        pageSize={pageSize}
        onOpenDetail={openDetailModal}
      />
      <Detail modalVisibility={modalVisibility} onClose={closeDetailModal} />
    </div>
  );
};
export default Transaction;

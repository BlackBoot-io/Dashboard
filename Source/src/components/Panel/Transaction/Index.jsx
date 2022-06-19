import { useEffect, useState } from "react";
import { useGetAllQuery, useGetByIdQuery } from "api/transaction";

import Detail from "./comps/Detail";
import Filter from "./comps/Filter";
import List from "./comps/List";

const Transaction = () => {
  const [dataSource, setDataSource] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [filterState, setFilterState] = useState({
    network: null,
    status: null,
    type: null,
  });
  const [pageSize, setPageSize] = useState(50);
  const [transactionId, setTransactionId] = useState(null);
  const transactions = useGetAllQuery();

  const transaction = useGetByIdQuery(transactionId, {
    skip: true,
  });

  const getTransactions = async () => {
    let filterdData = transactions.data.data.map((value) => {
      return {
        key: value.transactionId,
        ...value,
      };
    });
    if (filterState.network)
      filterdData = filterdData.filter(
        (x) => x.network === parseInt(filterState.network)
      );
    if (filterState.status)
      filterdData = filterdData.filter(
        (x) => x.status === parseInt(filterState.status)
      );
    if (filterState.type)
      filterdData = filterdData.filter(
        (x) => x.type === parseInt(filterState.type)
      );
    setDataSource(filterdData);
  };

  const handleFilterChange = (value, type) => {
    debugger;
    setFilterState((s) => ({
      ...s,
      [type]: value,
    }));
    getTransactions();
  };

  const openDetailModal = (id) => {
    setTransactionId(id);
    setModalVisibility(true);
  };
  const closeDetailModal = () => {
    setModalVisibility(false);
  };

  const handlePageSizeChange = (value) => {
    setPageSize(value);
  };

  useEffect(() => {
    if (transactions.data && transactions.isSuccess) {
      getTransactions();
    }
  }, [transactions.isSuccess, transactions.isError]);
  return (
    <div id="transaction">
      <Filter
        onPageSizeChange={handlePageSizeChange}
        onFilterChange={handleFilterChange}
      />
      {dataSource ? (
        <List
          data={dataSource}
          Loading={false}
          pageSize={pageSize}
          onOpenDetail={openDetailModal}
        />
      ) : null}
      {transaction.data ? (
        <Detail
          data={transaction.data.data}
          modalVisibility={modalVisibility}
          onClose={closeDetailModal}
        />
      ) : null}
    </div>
  );
};
export default Transaction;

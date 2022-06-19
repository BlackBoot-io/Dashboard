import { useEffect, useState } from "react";
import { useGetAllQuery, useGetByIdMutation } from "api/transaction";

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
  const transactions = useGetAllQuery();
  const [getTransDetails, transDetailsResult] = useGetByIdMutation();

  const filterTransactionResult = async () => {
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
    setFilterState((s) => ({
      ...s,
      [type]: value,
    }));
  };

  const openDetailModal = (id) => {
    getTransDetails(id);
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
      filterTransactionResult();
    }
  }, [transactions.isSuccess, transactions.isError, filterState]);
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
      {transDetailsResult.isSuccess &&
      transDetailsResult.data &&
      transDetailsResult.data.isSuccess &&
      modalVisibility ? (
        <Detail
          data={transDetailsResult.data.data}
          modalVisibility={modalVisibility}
          onClose={closeDetailModal}
        />
      ) : null}
    </div>
  );
};
export default Transaction;

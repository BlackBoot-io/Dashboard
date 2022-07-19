import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "./comps/Header";
import List from "./comps/List";
const Transactions = ({
  showHeaderIcon,
  data,
  loading,
  actions,
  className,
}) => {
  const { t } = useTranslation();
  const [filteredData, setFiltereddata] = useState(data ?? []);
  const [filterState, setFilterState] = useState({
    network: null,
    status: null,
    type: null,
  });
  const [pageSize, setPageSize] = useState(50);
  const filterTransactionResult = async () => {
    debugger;
    let filterdData = data.map((value) => {
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
    setFiltereddata(filterdData);
  };

  const handleFilterChange = (value, type) => {
    setFilterState((s) => ({
      ...s,
      [type]: value,
    }));
  };
  const handlePageSizeChange = (value) => {
    setPageSize(value);
  };
  useEffect(() => {
    if (loading || !data) return;
    filterTransactionResult();
  }, [data, filterState]);
  return (
    <div className={`transactions ${className ?? ""}`}>
      <Header
        showIcon={showHeaderIcon}
        onPageSizeChange={handlePageSizeChange}
        onFilterChange={handleFilterChange}
      />
      <List
        data={filteredData}
        Loading={loading}
        pageSize={pageSize}
        actions={actions}
      />
    </div>
  );
};
export default Transactions;

import { useEffect, useState } from "react";
import { useGetAllQuery, useGetByIdMutation } from "api/transaction";
import { useTranslation } from "react-i18next";

import Detail from "./comps/Detail";
import Transactions from "../comps/Transactions/index";

const Transaction = () => {
  const { t } = useTranslation();
  const [dataSource, setDataSource] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const transactions = useGetAllQuery();
  const [getTransDetails, transDetailsResult] = useGetByIdMutation();

  const openDetail = (id) => {
    getTransDetails(id);
    setModalVisibility(true);
  };
  const closeDetail = () => {
    setModalVisibility(false);
  };

  useEffect(() => {
    if (transactions.data && transactions.isSuccess) {
      setDataSource(transactions.data.data);
    }
  }, [transactions.isSuccess, transactions.isError]);
  const action = {
    title: () => t("Actions"),
    dataIndex: ["transactionId", "txId"],
    width: 70,
    align: "center",

    render: (text, row) => (
      <>
        <span
          onClick={() => openDetail(row["transactionId"])}
          style={{
            marginLeft: 2,
            cursor: "pointer",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 10H15V11H8V10ZM8 12H15V13H8V12ZM8 14H11.5V15H8V14Z"
              fill="#372DB0"
            />
            <path
              d="M7 13H2V3H5.585L7.295 4.705L7.585 5H14V9H15V5C15 4.73478 14.8946 4.48043 14.7071 4.29289C14.5196 4.10536 14.2652 4 14 4H8L6.295 2.295C6.20197 2.20142 6.09134 2.12717 5.96948 2.07654C5.84763 2.02591 5.71696 1.9999 5.585 2H2C1.73478 2 1.48043 2.10536 1.29289 2.29289C1.10536 2.48043 1 2.73478 1 3V13C1 13.2652 1.10536 13.5196 1.29289 13.7071C1.48043 13.8946 1.73478 14 2 14H7V13Z"
              fill="#372DB0"
            />
          </svg>
        </span>
        <span
          style={{
            cursor: "pointer",
            marginLeft: 20,
          }}
        >
          <a href={row["txId"]}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.7045 8.29558C11.4604 8.05151 11.0647 8.05152 10.8206 8.29561C10.5765 8.53969 10.5765 8.93542 10.8206 9.17949L11.7045 8.29558ZM11.2625 12.5242L10.8206 12.0822L10.8206 12.0823L11.2625 12.5242ZM8.73754 15.0492L9.17948 15.4911L9.17948 15.4911L8.73754 15.0492ZM4.95087 11.2625L5.39281 11.7045L5.39281 11.7045L4.95087 11.2625ZM6.65531 10.442C6.89939 10.1979 6.89939 9.80217 6.65531 9.5581C6.41123 9.31402 6.01551 9.31402 5.77143 9.5581L6.65531 10.442ZM8.29561 11.7045C8.53969 11.9486 8.93542 11.9486 9.17949 11.7045C9.42356 11.4604 9.42355 11.0647 9.17947 10.8206L8.29561 11.7045ZM8.73754 7.47587L9.17947 7.91782L9.17948 7.91781L8.73754 7.47587ZM11.2625 4.95087L11.7045 5.39281L11.7045 5.39281L11.2625 4.95087ZM15.0492 4.95087L14.6073 5.39281L14.6073 5.39281L15.0492 4.95087ZM15.0492 8.73754L15.4911 9.17948L15.4911 9.17948L15.0492 8.73754ZM13.3448 9.5581C13.1007 9.80217 13.1007 10.1979 13.3448 10.442C13.5888 10.6861 13.9846 10.6861 14.2286 10.442L13.3448 9.5581ZM10.8206 9.17949C11.2056 9.56441 11.4218 10.0865 11.4218 10.6309H12.6718C12.6718 9.75496 12.3238 8.91493 11.7045 8.29558L10.8206 9.17949ZM11.4218 10.6309C11.4218 11.1752 11.2056 11.6973 10.8206 12.0822L11.7045 12.9662C12.3238 12.3468 12.6718 11.5068 12.6718 10.6309H11.4218ZM10.8206 12.0823L8.2956 14.6073L9.17948 15.4911L11.7045 12.9661L10.8206 12.0823ZM8.2956 14.6073C7.49401 15.4088 6.19439 15.4088 5.39281 14.6073L4.50893 15.4911C5.79867 16.7809 7.88974 16.7809 9.17948 15.4911L8.2956 14.6073ZM5.39281 14.6073C4.59123 13.8057 4.59123 12.5061 5.39281 11.7045L4.50893 10.8206C3.21919 12.1103 3.21919 14.2014 4.50893 15.4911L5.39281 14.6073ZM5.39281 11.7045L6.65531 10.442L5.77143 9.5581L4.50893 10.8206L5.39281 11.7045ZM9.17947 10.8206C8.79452 10.4357 8.57826 9.91358 8.57826 9.3692H7.32826C7.32826 10.2451 7.67623 11.0851 8.29561 11.7045L9.17947 10.8206ZM8.57826 9.3692C8.57826 8.82483 8.79452 8.30275 9.17947 7.91782L8.29561 7.03392C7.67623 7.65326 7.32826 8.49329 7.32826 9.3692H8.57826ZM9.17948 7.91781L11.7045 5.39281L10.8206 4.50893L8.2956 7.03393L9.17948 7.91781ZM11.7045 5.39281C12.5061 4.59123 13.8057 4.59123 14.6073 5.39281L15.4911 4.50893C14.2014 3.21919 12.1103 3.21919 10.8206 4.50893L11.7045 5.39281ZM14.6073 5.39281C15.4088 6.19439 15.4088 7.49401 14.6073 8.2956L15.4911 9.17948C16.7809 7.88974 16.7809 5.79867 15.4911 4.50893L14.6073 5.39281ZM14.6073 8.2956L13.3448 9.5581L14.2286 10.442L15.4911 9.17948L14.6073 8.2956Z"
                fill="#7A808B"
              />
            </svg>
          </a>
        </span>
      </>
    ),
  };
  return (
    <div id="transaction">
      <Transactions
        showHeaderIcon={true}
        data={dataSource}
        loading={false}
        actions={action}
        // className={""}
      ></Transactions>

      {transDetailsResult.isSuccess &&
      transDetailsResult.data &&
      transDetailsResult.data.isSuccess &&
      modalVisibility ? (
        <Detail
          data={transDetailsResult.data.data}
          modalVisibility={modalVisibility}
          onClose={closeDetail}
        />
      ) : null}
    </div>
  );
};
export default Transaction;

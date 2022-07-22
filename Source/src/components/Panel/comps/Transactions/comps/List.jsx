import { useTranslation } from "react-i18next";
import Utils from "config/utils";
import { notification } from "antd";
import DataTable from "components/comps/DataTable";
import {
  transactionTypes,
  transactionStatusTypes,
  networkTypes,
} from "config/enums";
import BitcoinIcon from "assets/images/networks/bitcoin.svg";
import BscscanIcon from "assets/images/networks/bscscan.svg";
import EthereumIcon from "assets/images/networks/ethereum.svg";
import SolanaIcon from "assets/images/networks/solana.svg";
import TetherIcon from "assets/images/networks/tetherIcon.svg";

const NetworkType = ({ network }) => {
  let src = "";
  let alt = "";
  switch (network) {
    case networkTypes.Binance:
      src = BscscanIcon;
      alt = "Binance Network";
      break;
    case networkTypes.Bitcoin:
      src = BitcoinIcon;
      alt = "Bitcoin Network";
      break;
    case networkTypes.Ethereum:
      src = EthereumIcon;
      alt = "Ethereum Network";
      break;
    case networkTypes.Solana:
      src = SolanaIcon;
      alt = "Solana Network";
      break;
    case networkTypes.Tether:
      src = TetherIcon;
      alt = "Tether Network";
      break;
    default:
      break;
  }
  return <img width={85} src={src} alt={alt} />;
};

const Price = ({ usdtAmount, cryptoAmount, network }) => {
  let networkSymbol = "";
  switch (network) {
    case networkTypes.Binance:
      networkSymbol = "BNB";
      break;
    case networkTypes.Bitcoin:
      networkSymbol = "BTC";
      break;
    case networkTypes.Ethereum:
      networkSymbol = "ETH";
      break;
    case networkTypes.Solana:
      networkSymbol = "SOL";
      break;
    case networkTypes.Tether:
      networkSymbol = "USDT";
      break;
    default:
      break;
  }
  return (
    <>
      <span
        style={{
          fontWeight: 600,
        }}
      >
        {usdtAmount} USDT
      </span>
      <p>
        {cryptoAmount} {networkSymbol}
      </p>
    </>
  );
};
const List = ({ data, pageSize, loading, actions }) => {
  const { t } = useTranslation();
  const columns = [
    {
      key: "price",
      title: () => t("Price"),
      dataIndex: ["usdtAmount", "cryptoAmount", "network"],
      align: "center",
      width: 100,
      render: (text, row) => (
        <Price
          usdtAmount={row["usdtAmount"]}
          cryptoAmount={row["cryptoAmount"]}
          network={row["network"]}
        ></Price>
      ),
    },
    {
      key: "netwrok",
      title: () => t("Network"),
      dataIndex: "network",
      align: "center",
      width: 100,
      render: (value) => <NetworkType network={value}></NetworkType>,
    },
    {
      key: "walletAddress",
      title: () => t("WalletAddress"),
      dataIndex: "walletAddress",
      align: "center",
      width: 200,
      render: (value) => (
        <div>
          {Utils.shortTextMiddle(value, 20)}

          <span
            onClick={() => copyToClipboard(value)}
            style={{
              marginLeft: 4,
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
                d="M12 13C12 13.5304 11.7893 14.0391 11.4142 14.4142C11.0391 14.7893 10.5304 15 10 15H3C2.46957 15 1.96086 14.7893 1.58579 14.4142C1.21071 14.0391 1 13.5304 1 13V6C1 5.46957 1.21071 4.96086 1.58579 4.58579C1.96086 4.21071 2.46957 4 3 4V5C2.73478 5 2.48043 5.10536 2.29289 5.29289C2.10536 5.48043 2 5.73478 2 6V13C2 13.2652 2.10536 13.5196 2.29289 13.7071C2.48043 13.8946 2.73478 14 3 14H10C10.2652 14 10.5196 13.8946 10.7071 13.7071C10.8946 13.5196 11 13.2652 11 13H12Z"
                fill="#5B626E"
              />
              <path
                d="M6 2C5.73478 2 5.48043 2.10536 5.29289 2.29289C5.10536 2.48043 5 2.73478 5 3V10C5 10.2652 5.10536 10.5196 5.29289 10.7071C5.48043 10.8946 5.73478 11 6 11H13C13.2652 11 13.5196 10.8946 13.7071 10.7071C13.8946 10.5196 14 10.2652 14 10V3C14 2.73478 13.8946 2.48043 13.7071 2.29289C13.5196 2.10536 13.2652 2 13 2H6ZM6 1H13C13.5304 1 14.0391 1.21071 14.4142 1.58579C14.7893 1.96086 15 2.46957 15 3V10C15 10.5304 14.7893 11.0391 14.4142 11.4142C14.0391 11.7893 13.5304 12 13 12H6C5.46957 12 4.96086 11.7893 4.58579 11.4142C4.21071 11.0391 4 10.5304 4 10V3C4 2.46957 4.21071 1.96086 4.58579 1.58579C4.96086 1.21071 5.46957 1 6 1V1Z"
                fill="#5B626E"
              />
            </svg>
          </span>
        </div>
      ),
    },
    {
      key: "type",
      title: () => t("Type"),
      dataIndex: "type",
      align: "center",
      width: 100,
      render: (value) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            columnGap: 2,
            justifyContent: "center",
          }}
        >
          {value === transactionTypes.Deposit ? (
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.91663 12.6346C4.91663 12.2204 4.58084 11.8846 4.16663 11.8846C3.75241 11.8846 3.41663 12.2204 3.41663 12.6346H4.91663ZM4.16663 13.4769H3.41663H4.16663ZM16.5833 12.6346C16.5833 12.2204 16.2475 11.8846 15.8333 11.8846C15.4191 11.8846 15.0833 12.2204 15.0833 12.6346H16.5833ZM9.41187 13.0115C9.15481 13.3363 9.20971 13.808 9.5345 14.065C9.85929 14.3221 10.331 14.2672 10.588 13.9424L9.41187 13.0115ZM13.9214 9.73085C14.1784 9.40606 14.1235 8.93437 13.7988 8.6773C13.474 8.42024 13.0023 8.47514 12.7452 8.79993L13.9214 9.73085ZM9.41187 13.9424C9.66894 14.2672 10.1406 14.3221 10.4654 14.065C10.7902 13.808 10.8451 13.3363 10.588 13.0115L9.41187 13.9424ZM7.25472 8.79993C6.99765 8.47514 6.52596 8.42024 6.20117 8.6773C5.87638 8.93437 5.82147 9.40606 6.07854 9.73085L7.25472 8.79993ZM9.24996 13.4769C9.24996 13.8911 9.58575 14.2269 9.99996 14.2269C10.4142 14.2269 10.75 13.8911 10.75 13.4769H9.24996ZM10.75 4.21155C10.75 3.79733 10.4142 3.46155 9.99996 3.46155C9.58575 3.46155 9.24996 3.79733 9.24996 4.21155H10.75ZM3.41663 12.6346V13.4769H4.91663V12.6346H3.41663ZM3.41663 13.4769C3.41663 15.2791 4.86415 16.7539 6.66663 16.7539V15.2539C5.70768 15.2539 4.91663 14.4659 4.91663 13.4769H3.41663ZM6.66663 16.7539H13.3333V15.2539H6.66663V16.7539ZM13.3333 16.7539C15.1358 16.7539 16.5833 15.2791 16.5833 13.4769H15.0833C15.0833 14.4659 14.2922 15.2539 13.3333 15.2539V16.7539ZM16.5833 13.4769V12.6346H15.0833V13.4769H16.5833ZM10.588 13.9424L13.9214 9.73085L12.7452 8.79993L9.41187 13.0115L10.588 13.9424ZM10.588 13.0115L7.25472 8.79993L6.07854 9.73085L9.41187 13.9424L10.588 13.0115ZM10.75 13.4769V4.21155H9.24996V13.4769H10.75Z"
                fill="#009C7B"
              />
            </svg>
          ) : (
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.91663 12.6346C4.91663 12.2204 4.58084 11.8846 4.16663 11.8846C3.75241 11.8846 3.41663 12.2204 3.41663 12.6346H4.91663ZM4.16663 13.4769H3.41663H4.16663ZM16.5833 12.6346C16.5833 12.2204 16.2475 11.8846 15.8333 11.8846C15.4191 11.8846 15.0833 12.2204 15.0833 12.6346H16.5833ZM10.588 4.67701C10.8451 4.35221 10.7902 3.88052 10.4654 3.62346C10.1406 3.36639 9.66894 3.4213 9.41187 3.74609L10.588 4.67701ZM6.07854 7.95763C5.82147 8.28242 5.87638 8.75411 6.20117 9.01117C6.52596 9.26824 6.99765 9.21334 7.25472 8.88854L6.07854 7.95763ZM10.588 3.74609C10.331 3.4213 9.85929 3.36639 9.5345 3.62346C9.20971 3.88052 9.15481 4.35221 9.41187 4.67701L10.588 3.74609ZM12.7452 8.88854C13.0023 9.21334 13.474 9.26824 13.7988 9.01117C14.1235 8.75411 14.1784 8.28242 13.9214 7.95763L12.7452 8.88854ZM10.75 4.21155C10.75 3.79733 10.4142 3.46155 9.99996 3.46155C9.58575 3.46155 9.24996 3.79733 9.24996 4.21155H10.75ZM9.24996 13.4769C9.24996 13.8911 9.58575 14.2269 9.99996 14.2269C10.4142 14.2269 10.75 13.8911 10.75 13.4769H9.24996ZM3.41663 12.6346V13.4769H4.91663V12.6346H3.41663ZM3.41663 13.4769C3.41663 15.2791 4.86415 16.7539 6.66663 16.7539V15.2539C5.70768 15.2539 4.91663 14.4659 4.91663 13.4769H3.41663ZM6.66663 16.7539H13.3333V15.2539H6.66663V16.7539ZM13.3333 16.7539C15.1358 16.7539 16.5833 15.2791 16.5833 13.4769H15.0833C15.0833 14.4659 14.2922 15.2539 13.3333 15.2539V16.7539ZM16.5833 13.4769V12.6346H15.0833V13.4769H16.5833ZM9.41187 3.74609L6.07854 7.95763L7.25472 8.88854L10.588 4.67701L9.41187 3.74609ZM9.41187 4.67701L12.7452 8.88854L13.9214 7.95763L10.588 3.74609L9.41187 4.67701ZM9.24996 4.21155V13.4769H10.75V4.21155H9.24996Z"
                fill="#D22600"
              />
            </svg>
          )}

          <p
            style={{
              marginBottom: 0,
            }}
          >
            {t(Utils.getKeyByValue(transactionTypes, value))}
          </p>
        </div>
      ),
    },
    {
      key: "status",
      title: () => t("Status"),
      dataIndex: "status",
      align: "center",
      width: 120,
      render: (value) => (
        <p
          style={{
            color:
              value === transactionStatusTypes.ConfirmedByNetwork
                ? "#009C7B"
                : "#FA7609",
          }}
        >
          {t(Utils.getKeyByValue(transactionStatusTypes, value))}
        </p>
      ),
    },
    {
      key: "date",
      title: () => t("Date"),
      dataIndex: "date",
      align: "center",
      width: 100,
      render: (value) => (
        <>
          <span
            style={{
              fontWeight: 600,
            }}
          >
            {new Date(value).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <p
            style={{
              color: "#5B626E",
            }}
          >
            {new Date(value).toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </p>
        </>
      ),
    },
  ];
  if (actions) columns.push(actions);

  const copyToClipboard = (value) => {
    Utils.copyToClipboard(value);
    notification["success"]({
      message: "The wallet address copied to clipboard!",
    });
  };
  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        pageSize={pageSize}
      />
    </>
  );
};
export default List;

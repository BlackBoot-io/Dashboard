import { useState } from "react";
import { Col, Row, Button, Select } from "antd";
import { useTranslation } from "react-i18next";
import TransactionLogo from "assets/images/transaction.svg";
import Icon from "components/comps/Icon";
import BitcoinIcon from "assets/images/networks/bitcoin.svg";
import BscscanIcon from "assets/images/networks/bscscan.svg";
import EthereumIcon from "assets/images/networks/etherium.svg";
import SolanaIcon from "assets/images/networks/solana.svg";

const { Option } = Select;

const Filter = (props) => {
  const { t } = useTranslation();
  const [filterToggle, setFilterToggle] = useState(false);

  const filterToggleChange = () => {
    setFilterToggle(!filterToggle);
  };

  return (
    <>
      <Row>
        <Col xs={24} sm={6} className="transaction-header-logo">
          <img src={TransactionLogo} alt="logo" />
          <h1>{t("Transactions")} </h1>
        </Col>
        <Col xs={24} sm={18} className="transaction-header-action">
          <div className="transaction-header-action-pager">
            <h4>{t("ShowRows")}</h4>
            <Select
              defaultValue={5}
              onChange={props.onPageSizeChange}
              style={{ width: 70 }}
            >
              <Option value="50">50</Option>
              <Option value="100">100</Option>
              <Option value="200">200</Option>
            </Select>
          </div>
          <Button
            icon={
              <Icon
                style={{
                  marginRight: 5,
                }}
                name={"FaSlidersH"}
              />
            }
            onClick={filterToggleChange}
          >
            {t("Filter")}
          </Button>
        </Col>
        {filterToggle ? (
          <Row className="transaction-header-action-filters">
            <Select
              onChange={(value) => props.onFilterChange(value, "network")}
              style={{ width: 100 }}
              placeholder={t("Network")}
              dropdownMatchSelectWidth={150}
              allowClear={true}
            >
              <Option value="1">
                <img src={BitcoinIcon} alt="Bitcoin Network" />
              </Option>
              <Option value="2">
                <img src={EthereumIcon} alt="Ethereum Network" />
              </Option>
              <Option value="3">
                <img src={SolanaIcon} alt="Solana Network" />
              </Option>
              <Option value="4">
                <img src={BscscanIcon} alt="Solana Network" />
              </Option>
              <Option value="5">
                <img src={BscscanIcon} alt="Binance Network" />
              </Option>
            </Select>
            <Select
              onChange={(value) => props.onFilterChange(value, "type")}
              style={{ width: 100 }}
              placeholder={t("Type")}
              dropdownMatchSelectWidth={150}
              allowClear={true}
            >
              <Option value="0">Deposit</Option>
              <Option value="1">Withdraw</Option>
            </Select>
            <Select
              onChange={(value) => props.onFilterChange(value, "status")}
              style={{ width: 100 }}
              placeholder={t("Status")}
              dropdownMatchSelectWidth={150}
              allowClear={true}
            >
              <Option value="1">Pending</Option>
              <Option value="2">TimedOut</Option>
              <Option value="3">RejectByUser</Option>
              <Option value="4">RejectByNetwork</Option>
              <Option value="5">ConfirmedByNetwork</Option>5
            </Select>
          </Row>
        ) : null}
      </Row>
    </>
  );
};

export default Filter;

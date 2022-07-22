import { useState } from "react";
import { Col, Row, Button, Select } from "antd";
import { useTranslation } from "react-i18next";

import BitcoinIcon from "assets/images/networks/bitcoin.svg";
import BscscanIcon from "assets/images/networks/bscscan.svg";
import EthereumIcon from "assets/images/networks/ethereum.svg";
import SolanaIcon from "assets/images/networks/solana.svg";
import TetherIcon from "assets/images/networks/tetherIcon.svg";

import Dropdown from "../../../../comps/Dropdown";

const { Option } = Select;

const Header = ({ onPageSizeChange, onFilterChange, showIcon = true }) => {
  const { t } = useTranslation();
  const [filterToggle, setFilterToggle] = useState(false);

  const filterToggleChange = () => {
    setFilterToggle(!filterToggle);
  };

  return (
    <Row className="head-section">
      <Col xs={24} sm={6} className="heading">
        {showIcon ? (
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="44" height="44" fill="#E5E5E5" />
            <rect
              width="1440"
              height="650"
              transform="translate(-282 -103)"
              fill="white"
            />
            <rect width="44" height="44" rx="8" fill="#2CBCDF" />
            <path
              d="M32.5 22.9H27.007L24.2605 17.5L19.45 26.5L17.3935 22.9H11.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
        <h1 className="header-title">{t("Transactions")} </h1>
      </Col>
      <Col xs={24} sm={18} className="action">
        <div className="pager">
          <h4>{t("ShowRows")}</h4>
          <Dropdown
            defaultValue={50}
            onChange={onPageSizeChange}
            allowClear={false}
          >
            <Option value="50">50</Option>
            <Option value="100">100</Option>
            <Option value="200">200</Option>
          </Dropdown>
        </div>
        <Button
          className="filter-toggle"
          icon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1747_3481)">
                <path
                  d="M9.53304 6.33338C9.85432 6.33475 10.1669 6.22897 10.4213 6.03276C10.6757 5.83656 10.8574 5.56113 10.9378 5.25005L12.1944 5.25005C12.2902 5.25005 12.3821 5.21201 12.4498 5.14428C12.5175 5.07656 12.5555 4.98471 12.5555 4.88894C12.5555 4.79317 12.5175 4.70132 12.4498 4.6336C12.3821 4.56587 12.2902 4.52783 12.1944 4.52783L10.9378 4.52783C10.8622 4.21217 10.6825 3.93117 10.4276 3.73015C10.1728 3.52913 9.85763 3.4198 9.53304 3.4198C9.20845 3.4198 8.89333 3.52913 8.63848 3.73015C8.38363 3.93117 8.20392 4.21217 8.12832 4.52783L2.80554 4.52783C2.70977 4.52783 2.61792 4.56587 2.5502 4.6336C2.48248 4.70132 2.44443 4.79317 2.44443 4.88894C2.44443 4.98471 2.48248 5.07656 2.5502 5.14428C2.61792 5.21201 2.70977 5.25005 2.80554 5.25005L8.12832 5.25005C8.20864 5.56113 8.39037 5.83656 8.64479 6.03276C8.8992 6.22897 9.21176 6.33475 9.53304 6.33338V6.33338ZM8.81082 4.88894C8.81082 4.7461 8.85318 4.60646 8.93254 4.48769C9.0119 4.36893 9.12469 4.27636 9.25666 4.22169C9.38863 4.16703 9.53384 4.15273 9.67394 4.1806C9.81404 4.20846 9.94273 4.27725 10.0437 4.37825C10.1447 4.47926 10.2135 4.60794 10.2414 4.74804C10.2693 4.88814 10.255 5.03335 10.2003 5.16532C10.1456 5.29729 10.0531 5.41009 9.93429 5.48945C9.81552 5.5688 9.67588 5.61116 9.53304 5.61116C9.43729 5.6126 9.34221 5.59498 9.25333 5.55933C9.16445 5.52368 9.08355 5.47071 9.01534 5.4035C8.94712 5.33629 8.89295 5.25619 8.85598 5.16785C8.81901 5.07951 8.79998 4.9847 8.79999 4.88894L8.81082 4.88894Z"
                  fill="#5B626E"
                />
                <path
                  d="M8.2836 13.5556C8.60488 13.5569 8.91744 13.4511 9.17185 13.2549C9.42626 13.0587 9.608 12.7833 9.68832 12.4722L12.1944 12.4722C12.2902 12.4722 12.3821 12.4342 12.4498 12.3665C12.5175 12.2987 12.5555 12.2069 12.5555 12.1111C12.5555 12.0153 12.5175 11.9235 12.4498 11.8558C12.3821 11.788 12.2902 11.75 12.1944 11.75L9.68832 11.75C9.61272 11.4343 9.43301 11.1533 9.17816 10.9523C8.92331 10.7513 8.60819 10.642 8.2836 10.642C7.95901 10.642 7.64388 10.7513 7.38903 10.9523C7.13419 11.1533 6.95447 11.4343 6.87888 11.75L2.80554 11.75C2.70977 11.75 2.61792 11.788 2.5502 11.8558C2.48248 11.9235 2.44443 12.0153 2.44443 12.1111C2.44443 12.2069 2.48248 12.2987 2.5502 12.3665C2.61792 12.4342 2.70977 12.4722 2.80554 12.4722L6.87888 12.4722C6.95919 12.7833 7.14093 13.0587 7.39534 13.2549C7.64975 13.4511 7.96232 13.5569 8.2836 13.5556ZM7.56138 12.1111C7.56138 11.9683 7.60373 11.8286 7.68309 11.7099C7.76245 11.5911 7.87525 11.4985 8.00721 11.4439C8.13918 11.3892 8.2844 11.3749 8.4245 11.4028C8.56459 11.4306 8.69328 11.4994 8.79429 11.6004C8.89529 11.7014 8.96408 11.8301 8.99194 11.9702C9.01981 12.1103 9.00551 12.2555 8.95084 12.3875C8.89618 12.5195 8.80361 12.6323 8.68484 12.7116C8.56607 12.791 8.42644 12.8333 8.2836 12.8333C8.18755 12.8353 8.09208 12.818 8.00278 12.7826C7.91348 12.7471 7.83215 12.6942 7.76355 12.627C7.69494 12.5597 7.64045 12.4794 7.60326 12.3909C7.56606 12.3023 7.54691 12.2072 7.54693 12.1111L7.56138 12.1111Z"
                  fill="#5B626E"
                />
                <path
                  d="M5.15276 9.94447C5.47404 9.94583 5.78661 9.84005 6.04102 9.64384C6.29543 9.44764 6.47717 9.17222 6.55749 8.86114L12.1944 8.86114C12.2902 8.86114 12.3821 8.82309 12.4498 8.75537C12.5175 8.68765 12.5555 8.5958 12.5555 8.50002C12.5555 8.40425 12.5175 8.3124 12.4498 8.24468C12.3821 8.17696 12.2902 8.13891 12.1944 8.13891L6.55749 8.13891C6.48189 7.82325 6.30218 7.54225 6.04733 7.34123C5.79248 7.14021 5.47735 7.03088 5.15276 7.03088C4.82818 7.03088 4.51305 7.14021 4.2582 7.34123C4.00335 7.54225 3.82364 7.82325 3.74804 8.13891L2.80554 8.13891C2.70977 8.13891 2.61792 8.17696 2.5502 8.24468C2.48248 8.3124 2.44443 8.40425 2.44443 8.50002C2.44443 8.5958 2.48248 8.68765 2.5502 8.75537C2.61792 8.82309 2.70977 8.86114 2.80554 8.86114L3.74804 8.86114C3.82836 9.17222 4.0101 9.44764 4.26451 9.64384C4.51892 9.84005 4.83149 9.94583 5.15276 9.94447V9.94447ZM4.43054 8.50002C4.43054 8.35718 4.4729 8.21755 4.55226 8.09878C4.63162 7.98001 4.74441 7.88744 4.87638 7.83278C5.00835 7.77811 5.15357 7.76381 5.29366 7.79168C5.43376 7.81955 5.56245 7.88833 5.66345 7.98934C5.76446 8.09034 5.83324 8.21903 5.86111 8.35913C5.88898 8.49922 5.87467 8.64444 5.82001 8.77641C5.76535 8.90838 5.67278 9.02117 5.55401 9.10053C5.43524 9.17989 5.29561 9.22225 5.15276 9.22225C5.05701 9.22368 4.96193 9.20606 4.87305 9.17041C4.78418 9.13476 4.70327 9.08179 4.63506 9.01458C4.56684 8.94737 4.51267 8.86727 4.4757 8.77893C4.43873 8.69059 4.4197 8.59579 4.41971 8.50002L4.43054 8.50002Z"
                  fill="#5B626E"
                />
              </g>
              <defs>
                <clipPath id="clip0_1747_3481">
                  <rect
                    width="13"
                    height="13"
                    fill="white"
                    transform="translate(14 2) rotate(90)"
                  />
                </clipPath>
              </defs>
            </svg>
          }
          onClick={filterToggleChange}
        >
          {t("Filter")}
        </Button>
      </Col>
      {filterToggle ? (
        <Row className="filters">
          <Dropdown
            onChange={(value) => onFilterChange(value, "network")}
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
              <img src={TetherIcon} alt="Tether Network" />
            </Option>
            <Option value="5">
              <img src={BscscanIcon} alt="Binance Network" />
            </Option>
          </Dropdown>
          <Dropdown
            onChange={(value) => onFilterChange(value, "type")}
            placeholder={t("Type")}
            dropdownMatchSelectWidth={150}
            allowClear={true}
          >
            <Option value="0">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: 2,
                }}
              >
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

                <p
                  style={{
                    marginBottom: 0,
                  }}
                >
                  Deposit
                </p>
              </div>
            </Option>
            <Option value="1">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: 2,
                }}
              >
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
                <p
                  style={{
                    marginBottom: 0,
                  }}
                >
                  Withdraw
                </p>
              </div>
            </Option>
          </Dropdown>
          <Dropdown
            onChange={(value) => onFilterChange(value, "status")}
            placeholder={t("Status")}
            dropdownMatchSelectWidth={150}
            allowClear={true}
          >
            <Option value="1">Pending</Option>
            <Option value="2">TimedOut</Option>
            <Option value="3">RejectByUser</Option>
            <Option value="4">RejectByNetwork</Option>
            <Option value="5">ConfirmedByNetwork</Option>5
          </Dropdown>
        </Row>
      ) : null}
    </Row>
  );
};

export default Header;

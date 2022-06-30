import { useTranslation } from "react-i18next";
import pancakeImage from "assets/images/exchange-list/pancake.png";
import babyImage from "assets/images/exchange-list/baby.png";
const ExchangeList = () => {
  const { t } = useTranslation();
  return (
    <div id="exchange-list" className="custom-card">
      <h4 className="sec-title">
        <svg
          width="14"
          height="16"
          viewBox="0 0 14 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 7.75045C7.41421 7.75045 7.75 7.41467 7.75 7.00045C7.75 6.58624 7.41421 6.25045 7 6.25045V7.75045ZM1 6.25045C0.585786 6.25045 0.25 6.58624 0.25 7.00045C0.25 7.41467 0.585786 7.75045 1 7.75045V6.25045ZM7 10.7505C7.41421 10.7505 7.75 10.4147 7.75 10.0005C7.75 9.58624 7.41421 9.25045 7 9.25045V10.7505ZM1 9.25045C0.585786 9.25045 0.25 9.58624 0.25 10.0005C0.25 10.4147 0.585786 10.7505 1 10.7505V9.25045ZM12.7864 2.00938C13.1834 2.12737 13.6009 1.90115 13.7189 1.50409C13.8369 1.10704 13.6107 0.689516 13.2136 0.571526L12.7864 2.00938ZM5.30841 3.93388L4.69795 3.49817L5.30841 3.93388ZM5.30841 12.067L5.91887 11.6313L5.30841 12.067ZM13.2136 15.4294C13.6107 15.3114 13.8369 14.8939 13.7189 14.4968C13.6009 14.0998 13.1834 13.8735 12.7864 13.9915L13.2136 15.4294ZM7 6.25045H1V7.75045H7V6.25045ZM7 9.25045H1V10.7505H7V9.25045ZM13.2136 0.571526C10.0414 -0.371159 6.6205 0.80451 4.69795 3.49817L5.91887 4.36958C7.46931 2.19727 10.2281 1.24915 12.7864 2.00938L13.2136 0.571526ZM4.69795 3.49817C2.7754 6.19183 2.7754 9.80908 4.69795 12.5027L5.91887 11.6313C4.36842 9.45902 4.36842 6.54189 5.91887 4.36958L4.69795 3.49817ZM4.69795 12.5027C6.6205 15.1964 10.0414 16.3721 13.2136 15.4294L12.7864 13.9915C10.2281 14.7518 7.46931 13.8036 5.91887 11.6313L4.69795 12.5027Z"
            fill="#949494"
          />
        </svg>
        {t("exchangeList")}
      </h4>
      <div className="items">
        <figure className="item">
          <img width={42} height={42} src={babyImage} alt="baby swap" />
          <figcaption>{t("babySwap")}</figcaption>
          <span className="live">
            <svg
              width="4"
              height="4"
              viewBox="0 0 4 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="2.00004" cy="1.99967" r="1.66667" fill="#007542" />
            </svg>
            {t("live")}
          </span>
        </figure>
        <figure className="item">
          <img width={42} height={42} src={pancakeImage} alt="pancake swap" />
          <figcaption>{t("pancakeSwap")}</figcaption>
          <span className="from">{t("pancakeSwaptExchangeDate")}</span>
        </figure>
      </div>
    </div>
  );
};
export default ExchangeList;

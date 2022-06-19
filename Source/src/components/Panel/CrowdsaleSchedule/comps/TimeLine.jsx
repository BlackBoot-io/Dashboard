import { Col, Timeline } from "antd";
import { useTranslation } from "react-i18next";
const TimeLine = ({ items, current }) => {
  const { t } = useTranslation();
  return (
    <Col id="time-line" xs={4} sm={4}>
      {items?.map((x, idx) => {
        let to = new Date(x.to);
        let toYear = to.getFullYear();
        let options = {};
        options.dot =
          idx === current ? (
            <svg
              width="9"
              height="9"
              viewBox="0 0 9 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="4.5" cy="4.5" r="4" fill="#8657F9" stroke="#8859F9" />
            </svg>
          ) : (
            <svg
              width="9"
              height="9"
              viewBox="0 0 9 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.5 4.48308C8.5 6.6811 6.71092 8.46617 4.5 8.46617C2.28908 8.46617 0.5 6.6811 0.5 4.48308C0.5 2.28506 2.28908 0.5 4.5 0.5C6.71092 0.5 8.5 2.28506 8.5 4.48308Z"
                fill="white"
                stroke="#753FF8"
              />
            </svg>
          );

        return (
          <Timeline.Item {...options} key={idx}>
            {idx === items.length - 1 || idx === 0 ? toYear : null}
          </Timeline.Item>
        );
      })}
    </Col>
  );
};
export default TimeLine;

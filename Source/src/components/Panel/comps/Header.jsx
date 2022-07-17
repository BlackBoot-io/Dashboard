import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Layout as AntLayout, Avatar } from "antd";
import { dark, light } from "../../../redux/theme";
import { Link } from "react-router-dom";
import routes from "config/routes";
import Utils from "config/utils";
import storageKeys from "config/storageKeys";

import { useNotificationCountQuery } from "api/notification";
const { Header } = AntLayout;
const LayoutHeader = () => {
  const { t } = useTranslation();
  const { user } = useSelector((x) => x.auth);
  const { lightMode } = useSelector((x) => x.theme);
  const dispatch = useDispatch();
  const { data, isSuccess } = useNotificationCountQuery();
  const handleTheme = (isLight) => {
    if (isLight) {
      dispatch(light());
      document.getElementsByTagName("body")[0].classList.remove("dark");
      Utils.removeStoredData(storageKeys.theme);
    } else {
      dispatch(dark());
      document.getElementsByTagName("body")[0].classList.add("dark");
      Utils.storedData(storageKeys.theme, "dark");
    }
  };
  return (
    <Header id="header">
      <div className="user">
        <span className="line-throw">{t("hello")}</span>&nbsp;,&nbsp;
        <strong>{user?.fullName}</strong>
      </div>
      <div className="actions">
        <Link to={`/${routes.profile}`}>
          {user.avatar ? (
            <Avatar
              size={32}
              src={
                user.avatar.startsWith("http")
                  ? user.avatar
                  : `data:image/png;base64,${user.avatar}`
              }
            />
          ) : (
            <Avatar size={32} src={user.avatar.startsWith}>
              {user.fullName ? user.fullName[0].toUpperCase() : null}
            </Avatar>
          )}
        </Link>
        <Link className={`center a-notif`} to={`/${routes.notifications}`}>
          {data && isSuccess && data.data > 0 ? (
            <svg
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.28443 14.0209C7.15392 10.4536 9.93434 7.45334 13.5012 7.3125C17.068 7.45334 19.8484 10.4536 19.7179 14.0209C19.7179 15.5025 21.3278 16.9459 21.3751 18.4309C21.3751 18.4519 21.3751 18.4729 21.3751 18.4939C21.4099 19.4453 20.6681 20.2454 19.7168 20.2826H16.1258C16.1291 21.0117 15.8543 21.7145 15.3574 22.248C14.8796 22.7669 14.2065 23.0621 13.5012 23.0621C12.7959 23.0621 12.1227 22.7669 11.6449 22.248C11.148 21.7145 10.8732 21.0117 10.8766 20.2826H7.28443C6.3331 20.2454 5.59134 19.4453 5.62618 18.4939C5.62618 18.4729 5.62618 18.4519 5.62618 18.4309C5.67455 16.9504 7.28443 15.5036 7.28443 14.0209Z"
                stroke={lightMode ? "black" : "white"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.8766 19.5326C10.4624 19.5326 10.1266 19.8684 10.1266 20.2826C10.1266 20.6968 10.4624 21.0326 10.8766 21.0326V19.5326ZM16.1258 21.0326C16.54 21.0326 16.8758 20.6968 16.8758 20.2826C16.8758 19.8684 16.54 19.5326 16.1258 19.5326V21.0326ZM14.6262 5.8125C15.0404 5.8125 15.3762 5.47671 15.3762 5.0625C15.3762 4.64829 15.0404 4.3125 14.6262 4.3125V5.8125ZM12.3762 4.3125C11.962 4.3125 11.6262 4.64829 11.6262 5.0625C11.6262 5.47671 11.962 5.8125 12.3762 5.8125V4.3125ZM10.8766 21.0326H16.1258V19.5326H10.8766V21.0326ZM14.6262 4.3125H12.3762V5.8125H14.6262V4.3125Z"
                fill={lightMode ? "black" : "white"}
              />
              <line
                x1="11.875"
                y1="5.125"
                x2="15.125"
                y2="5.125"
                stroke="#FF7E00"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
              <circle cx="19" cy="9" r="3" fill="#D22600" />
            </svg>
          ) : (
            <svg
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.28443 14.0209C7.15392 10.4536 9.93434 7.45334 13.5012 7.3125C17.068 7.45334 19.8484 10.4536 19.7179 14.0209C19.7179 15.5025 21.3278 16.9459 21.3751 18.4309C21.3751 18.4519 21.3751 18.4729 21.3751 18.4939C21.4099 19.4453 20.6681 20.2454 19.7168 20.2826H16.1258C16.1291 21.0117 15.8543 21.7145 15.3574 22.248C14.8796 22.7669 14.2065 23.0621 13.5012 23.0621C12.7959 23.0621 12.1227 22.7669 11.6449 22.248C11.148 21.7145 10.8732 21.0117 10.8766 20.2826H7.28443C6.3331 20.2454 5.59134 19.4453 5.62618 18.4939C5.62618 18.4729 5.62618 18.4519 5.62618 18.4309C5.67455 16.9504 7.28443 15.5036 7.28443 14.0209Z"
                stroke={lightMode ? "black" : "white"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.8766 19.5326C10.4624 19.5326 10.1266 19.8684 10.1266 20.2826C10.1266 20.6968 10.4624 21.0326 10.8766 21.0326V19.5326ZM16.1258 21.0326C16.54 21.0326 16.8758 20.6968 16.8758 20.2826C16.8758 19.8684 16.54 19.5326 16.1258 19.5326V21.0326ZM14.6262 5.8125C15.0404 5.8125 15.3762 5.47671 15.3762 5.0625C15.3762 4.64829 15.0404 4.3125 14.6262 4.3125V5.8125ZM12.3762 4.3125C11.962 4.3125 11.6262 4.64829 11.6262 5.0625C11.6262 5.47671 11.962 5.8125 12.3762 5.8125V4.3125ZM10.8766 21.0326H16.1258V19.5326H10.8766V21.0326ZM14.6262 4.3125H12.3762V5.8125H14.6262V4.3125Z"
                fill="black"
              />
              <line
                x1="11.875"
                y1="5.125"
                x2="15.125"
                y2="5.125"
                stroke="#FF7E00"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          )}
        </Link>
        <span className="divider"></span>
        <div className="mode">
          <button
            className={`btn-link btn-light ${lightMode ? "active" : ""}`}
            onClick={() => handleTheme(true)}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="11" cy="27" r="4" fill="#FFB164" stroke="#FFB164" />
              <circle cx="23" cy="17" r="3" fill="#FFB164" stroke="#FFB164" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24.375 20C24.375 22.4162 22.4162 24.375 20 24.375C17.5838 24.375 15.625 22.4162 15.625 20C15.625 17.5838 17.5838 15.625 20 15.625C22.4162 15.625 24.375 17.5838 24.375 20Z"
                stroke={lightMode ? "black" : "white"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M31.6667 20.75C32.0809 20.75 32.4167 20.4143 32.4167 20C32.4167 19.5858 32.0809 19.25 31.6667 19.25V20.75ZM28.75 19.25C28.3358 19.25 28 19.5858 28 20C28 20.4143 28.3358 20.75 28.75 20.75V19.25ZM11.25 20.75C11.6643 20.75 12 20.4143 12 20C12 19.5858 11.6643 19.25 11.25 19.25V20.75ZM8.33337 19.25C7.91916 19.25 7.58337 19.5858 7.58337 20C7.58337 20.4143 7.91916 20.75 8.33337 20.75V19.25ZM20.75 8.33337C20.75 7.91916 20.4143 7.58337 20 7.58337C19.5858 7.58337 19.25 7.91916 19.25 8.33337H20.75ZM19.25 11.25C19.25 11.6643 19.5858 12 20 12C20.4143 12 20.75 11.6643 20.75 11.25H19.25ZM20.75 28.75C20.75 28.3358 20.4143 28 20 28C19.5858 28 19.25 28.3358 19.25 28.75H20.75ZM19.25 31.6667C19.25 32.0809 19.5858 32.4167 20 32.4167C20.4143 32.4167 20.75 32.0809 20.75 31.6667H19.25ZM28.7804 12.2804C29.0733 11.9875 29.0733 11.5126 28.7804 11.2197C28.4875 10.9268 28.0126 10.9268 27.7197 11.2197L28.7804 12.2804ZM25.6564 13.283C25.3635 13.5759 25.3635 14.0508 25.6564 14.3437C25.9493 14.6366 26.4241 14.6366 26.717 14.3437L25.6564 13.283ZM14.3437 26.717C14.6366 26.4241 14.6366 25.9493 14.3437 25.6564C14.0508 25.3635 13.5759 25.3635 13.283 25.6564L14.3437 26.717ZM11.2197 27.7197C10.9268 28.0126 10.9268 28.4875 11.2197 28.7804C11.5126 29.0733 11.9875 29.0733 12.2804 28.7804L11.2197 27.7197ZM12.2804 11.2197C11.9875 10.9268 11.5126 10.9268 11.2197 11.2197C10.9268 11.5126 10.9268 11.9875 11.2197 12.2804L12.2804 11.2197ZM13.283 14.3437C13.5759 14.6366 14.0508 14.6366 14.3437 14.3437C14.6366 14.0508 14.6366 13.5759 14.3437 13.283L13.283 14.3437ZM26.7187 25.658C26.4258 25.3652 25.9509 25.3652 25.658 25.658C25.3652 25.9509 25.3652 26.4258 25.658 26.7187L26.7187 25.658ZM27.7197 28.7804C28.0126 29.0733 28.4875 29.0733 28.7804 28.7804C29.0733 28.4875 29.0733 28.0126 28.7804 27.7197L27.7197 28.7804ZM31.6667 19.25H28.75V20.75H31.6667V19.25ZM11.25 19.25H8.33337V20.75H11.25V19.25ZM19.25 8.33337V11.25H20.75V8.33337H19.25ZM19.25 28.75V31.6667H20.75V28.75H19.25ZM27.7197 11.2197L25.6564 13.283L26.717 14.3437L28.7804 12.2804L27.7197 11.2197ZM13.283 25.6564L11.2197 27.7197L12.2804 28.7804L14.3437 26.717L13.283 25.6564ZM11.2197 12.2804L13.283 14.3437L14.3437 13.283L12.2804 11.2197L11.2197 12.2804ZM25.658 26.7187L27.7197 28.7804L28.7804 27.7197L26.7187 25.658L25.658 26.7187Z"
                fill={lightMode ? "black" : "white"}
              />
            </svg>
          </button>
          <span className="mode-name">
            {lightMode ? t("lightMode") : t("darkMode")}
          </span>
          <button
            className={`btn-link btn-dark ${!lightMode ? "active" : ""}`}
            onClick={() => handleTheme(false)}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.6668 20.0013C11.66 17.7119 12.2952 15.4664 13.5001 13.5197C14.6684 11.6289 16.377 10.1322 18.4051 9.22299C20.3842 8.34045 22.5919 8.10708 24.7118 8.55632L25.0151 8.62632C23.6755 9.52057 22.5429 10.6913 21.6934 12.0597C20.4885 14.0064 19.8534 16.2519 19.8601 18.5413C19.8447 21.5965 20.9868 24.5442 23.0568 26.7913C24.4746 28.3237 26.3082 29.4096 28.3334 29.9163C26.6305 31.0538 24.6297 31.6632 22.5818 31.668C19.6462 31.6503 16.8501 30.4126 14.8634 28.2513C12.7935 26.0042 11.6513 23.0565 11.6668 20.0013Z"
                stroke="#C4C4C4"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </Header>
  );
};
export default LayoutHeader;

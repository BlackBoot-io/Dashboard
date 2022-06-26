import CryptoJS from "crypto-js";
import config from "config/settings";

export default class Utils {
  static decrypt = (txt) => {
    if (!txt) return null;
    var bytes = CryptoJS.AES.decrypt(txt, config.salt);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  };
  static encrypt = (data) =>
    CryptoJS.AES.encrypt(JSON.stringify(data), config.salt).toString();

  static convertToQueryString = (obj) => new URLSearchParams(obj).toString();

  static sortAsc(key) {
    return function (a, b) {
      if (a[key] === b[key]) return 0;
      else if (a[key] > b[key]) return 1;
      else return -1;
    };
  }
  static sortDesc = function (key) {
    return function (a, b) {
      if (a[key] === b[key]) return 0;
      else if (a[key] > b[key]) return -1;
      else return 1;
    };
  };
  static arraySum = (arr, field) =>
    arr.reduce((acc, x) => acc + (field ? x[field] : x), 0);

  static copyToClipboard(text) {
    const range = document.createRange();
    const selection = document.getSelection();
    const mark = document.createElement("span");
    mark.textContent = text;
    // reset user styles for span element
    mark.style.all = "unset";
    // prevents scrolling to the end of the page
    mark.style.position = "fixed";
    mark.style.top = 0;
    mark.style.clip = "rect(0, 0, 0, 0)";
    // used to preserve spaces and line breaks
    mark.style.whiteSpace = "pre";
    // do not inherit user-select (it may be `none`)
    mark.style.webkitUserSelect = "text";
    mark.style.MozUserSelect = "text";
    mark.style.msUserSelect = "text";
    mark.style.userSelect = "text";
    mark.addEventListener("copy", function (e) {
      e.stopPropagation();
    });

    document.body.appendChild(mark);

    // The following line is very important
    if (selection.rangeCount > 0) {
      selection.removeAllRanges();
    }

    range.selectNodeContents(mark);
    selection.addRange(range);
    document.execCommand("copy");
    document.body.removeChild(mark);
  }
  static commaThousondSeperator(input, commo = ",", dot = "/") {
    if (!input) return input;
    let str = isNaN(input) ? input : input.toString();
    let arr = str.split(".");
    return (
      arr[0].replace(/\B(?=(\d{3})+(?!\d))/g, commo) +
      (arr.length === 2 ? `${dot}${arr[1]}` : "")
    );
  }
  static shortText(text, length, appender) {
    if (!text) return;
    let textLength = text.length;
    if (textLength > length)
      return text.substring(0, length) + (appender ?? "...");
    return text;
  }
  static shortTextMiddle(text, length, appender) {
    if (!text) return;
    let textLength = text.length;
    if (length > textLength) return text;
    appender = appender || "...";
    let charsToShow = length - appender.length,
      frontChars = Math.ceil(charsToShow / 2),
      backChars = Math.floor(charsToShow / 2);
    return (
      text.substr(0, frontChars) +
      appender +
      text.substr(textLength - backChars)
    );
  }
  static formatNumber(num, decimalLength = 1, dot = "/") {
    if (!num) return num;
    let isNegative = num < 0;
    num = Math.abs(num);
    let result = num;
    let suffix = "";
    const lessThanThousond = 999,
      thousond = 1000,
      million = 1000000,
      Billion = 1000000000,
      trillion = 1000000000000;

    if (num > lessThanThousond && num <= million) {
      result = (num / thousond).toFixed(decimalLength);
      suffix = "K";
    } else if (num > million && num <= Billion) {
      result = (num / 1000000).toFixed(decimalLength);
      suffix = "M";
    } else if (num > Billion && num <= trillion) {
      result = (num / Billion).toFixed(decimalLength);
      suffix = "B";
    } else if (num >= trillion) {
      result = (num / trillion).toFixed(decimalLength);
      suffix = "T";
    }
    result = parseFloat(result);
    return `${isNegative ? "-" : ""}${result}${suffix}`.replace(".", dot);
  }
  static multipleSort = function (options) {
    return function (a, b) {
      for (let i = 0; i < options.length; i++) {
        let { field, asc } = options[i];
        let aVal = a[field];
        let bVal = b[field];
        if (!aVal) return 1;
        else if (!bVal) return -1;
        if (!isNaN(aVal)) aVal = parseFloat(aVal);
        if (!isNaN(bVal)) bVal = parseFloat(bVal);
        if (aVal > bVal) return asc ? 1 : -1;
        else if (aVal < bVal) return asc ? -1 : 1;
        else return 0;
      }
    };
  };
  static getStoredData = (key) => {
    try {
      let value = localStorage.getItem(key);
      if (value) return this.decrypt(value);
      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  };
  static storedData = (key, value) => {
    if (!value) return;
    localStorage.setItem(key, this.encrypt(value));
  };
  static removeStoredData = (key) => {
    localStorage.removeItem(key);
  };

  static getKeyByValue = (object, value) => {
    return Object.keys(object).find((key) => object[key] === value);
  };
}

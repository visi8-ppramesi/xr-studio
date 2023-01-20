import { toRelativeTime, toAbsoluteTime, toLongMonth } from "./time";
import startCase from "lodash/startCase";

export const formatters = {
  currency: function (number, locale = "id-ID", currency = "IDR") {
    const intlFormatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    });
    return intlFormatter.format(number);
  },
  ceil: function (num, dec) {
    return Math.ceil(num * 10 ** dec) / 10 ** dec;
  },
  round: function (num, dec) {
    return Math.round(num * 10 ** dec) / 10 ** dec;
  },
  floor: function (num, dec) {
    return Math.floor(num * 10 ** dec) / 10 ** dec;
  },
  startCase: function (str) {
    return startCase(str);
  },
  absoluteDate: function (dateObj, locale = "id-ID") {
    return toAbsoluteTime(dateObj, locale);
  },
  relativeDate: function (dateObj, locale = "id-ID") {
    return toRelativeTime(dateObj, locale);
  },
  longMonth: toLongMonth,
  getWeekendDaysBetweenDates(start, end) {
    if (!(start instanceof Date)) {
      start = new Date(start);
    }
    if (!(end instanceof Date)) {
      end = new Date(end);
    }
    if (isNaN(start) || isNaN(end)) {
      return 0;
    }
    var ndays =
      1 + Math.round((start.getTime() - end.getTime()) / (24 * 3600 * 1000));
    var nsaturdays = Math.floor((end.getDay() + ndays) / 7);
    return 2 * nsaturdays + (end.getDay() == 0) - (start.getDay() == 6);
  },
};
export const filters = {
  truncate: function (text, length, clamp) {
    clamp = clamp || "...";
    let counter = 0;
    let stop;
    const splitted = text.split(" ");
    splitted.every((word, idx) => {
      counter += word.length;
      if (counter > length) {
        stop = idx;
        return false;
      }
      return true;
    });
    return text.length > length
      ? splitted.slice(0, stop + 1).join(" ") + clamp
      : text;
  },
  priceUnitFilter: function (hashCode, unit, price, dateHasherInstance) {
    let myUnit = "unix";
    switch (unit.toLowerCase()) {
      case "per day":
      case "day":
        myUnit = "days";
        break;
      case "per month":
      case "month":
        myUnit = "months";
        break;
      case "per year":
      case "year":
        myUnit = "years";
        break;
    }

    return (
      price *
      formatters.round(
        dateHasherInstance.getIntervalLength(hashCode, myUnit),
        2
      )
    );
  },
};

exports.formatters = {
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

    getWeekendDaysBetweenDates(start, end) {
      if(!(start instanceof Date)){
        start = new Date(start);
      }
      if(!(end instanceof Date)){
        end = new Date(end);
      }
      if(isNaN(start) || isNaN(end)){
        return 0;
      }
      var ndays = 1 + Math.round((start.getTime() - end.getTime()) / (24 * 3600 * 1000));
      var nsaturdays = Math.floor((end.getDay() + ndays) / 7);
      return 2 * nsaturdays + (end.getDay() == 0) - (start.getDay() == 6);
    },
};

exports.processors = {
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
  calculateTotalDailyPrice(startDate, endDate, dayLength, pricePerDay, excludeWeekends = false) {
    const length = dayLength - (excludeWeekends ? 0 : this.getWeekendDaysBetweenDates(startDate, endDate));
    return pricePerDay * length;
  }
}